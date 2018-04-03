import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CustomizationPage } from './../customization/customization';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Observable } from '@firebase/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  manufacturer: String = "";

  models: any[] = [];
  modelSelected: String = "";

  trims: any[] = [];
  trimSelected: string = "";

  constructor(public navCtrl: NavController, 
    private _fDB: AngularFireDatabase, 
    private _loadingCtrl: LoadingController) {}

  ionViewDidLoad(){
   let loading = this._loadingCtrl.create({spinner:'crescent', content: 'Please Wait...'})
   loading.present();

   loading.dismiss();
  }

  getModels(){
    if(this.manufacturer == "Honda")
      this.models = ["Civic", "Accord"];
    else if (this.manufacturer == "Volkswagen")
      this.models = ["Golf", "Jetta"];
  }

  getTrims(){
    if(this.modelSelected == 'Civic')
      this.trims = ["LX 4dr Sedan", "LX 2dr Coupe"]
    else if(this.modelSelected == 'Accord')
      this.trims = ["LX", "Sport"]
    else if(this.modelSelected == "Golf")
      this.trims = ["GTI", "Type R"]
    else
      this.trims = ["SE", "SE Sport"]
  }

  customizeVehicle(){
    this.navCtrl.push(CustomizationPage, {manufacturer: this.manufacturer, model: this.modelSelected, trim: this.trimSelected});
  }



}
