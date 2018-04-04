import { Dealerships } from './../../data_structs/structs';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LaunchNavigator} from '@ionic-native/launch-navigator';



@IonicPage()
@Component({
  selector: 'page-booking-confirmation',
  templateUrl: 'booking-confirmation.html',
})
export class BookingConfirmationPage {
  dealership: Dealerships;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  geoCoder: any;
  markers:any [] =[];


  constructor(public navCtrl: NavController, public navParams: NavParams, private _lauchNav: LaunchNavigator,) {
    this.dealership = this.navParams.get('dealership');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingConfirmationPage');
    
  }

  navigate(){
    this._lauchNav.navigate(this.dealership.address).then(() => console.log("app opened"))
  }
}
