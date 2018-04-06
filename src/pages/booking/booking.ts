import { BookingConfirmationPage } from './../booking-confirmation/booking-confirmation';
import { Manufacturer, Design, Trim, Color, Dealerships, Model } from './../../data_structs/structs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {

  formBooking: FormGroup;
  appointDate: string = "Pick Appointment Date"
  dealership: Dealerships;
  design: Design;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private _formBuilder: FormBuilder, private _datePicker: DatePicker, private _loadingCtrl: LoadingController,
  private _fDb: AngularFireDatabase, private _alertCtrl: AlertController) {
    this.formBooking = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
    
    this.dealership = this.navParams.get('dealership');
    this.design = this.navParams.get('design');
  }

  pickDate(){
    this._datePicker.show({
      date: new Date(),
      mode: 'datetime',
      allowOldDates: false
    }).then(
      date => {
        this.appointDate = date.toString()
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }


  book(){
    let loader = this._loadingCtrl.create({
      spinner: 'crescent',
      content: 'Signing Up',
    });

    if(this.formBooking.valid && this.appointDate){
      let email = this.formBooking.get('email').value;
      let name =  this.formBooking.get('name').value;
      let phone =  this.formBooking.get('phone').value;

      email = email.trim();
      name = name.trim();

      if(email != "" && name != ""){
        if(this.isValidNumber(phone)){
          const booking = this._fDb.list('Bookings');
          booking.push({
            email: email,
            name: name,
            phone: phone,
            date: this.appointDate,
            design: this.design,
            dealership: this.dealership
          }).then(()=> {
            loader.dismiss();
            this.navCtrl.push(BookingConfirmationPage, {dealership: this.dealership});
          })
        }
      }
    }
    else {
      this.showAlert('Oops!', "Please complete all fields in the form")
    }
  }

  isValidNumber(val: string) {
    for(let i = 0; i < val.length; i++) {
      if(val.charCodeAt(i) < 48 || val.charCodeAt(i) > 57)
        return false;
    }
    if(val.length != 10)
      return false;
    return true;
  }


  showAlert(title: string, msg: string) {
    let alert = this._alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
}
