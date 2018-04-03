import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { CustomizationPage } from './../customization/customization';
import { Manufacturer } from './../../data_structs/manufacturer';
import { Model } from './../../data_structs/model';
import { Trim } from './../../data_structs/trim';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage { 
  manufacturers: Observable<Manufacturer[]>;
  models: Observable<Model[]>;
  trims: Observable<Trim[]>;

  manufacturer: Manufacturer = null;
  model: Model = null;
  trim: Trim = null;

  constructor(public navCtrl: NavController, private fDB: AngularFireDatabase, 
    private loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
   let loading = this.loadingCtrl.create({spinner:'crescent', content: 'Please Wait...'})
   loading.present();

   this.manufacturers = this.fDB.list<Manufacturer>('manufacturers').valueChanges();
   loading.dismiss();
  }

  manuChange(manuID: string) {
    let loading = this.loadingCtrl.create({spinner:'crescent', content: 'Please Wait...'})
    loading.present();
    this.models = this.fDB.list<Model>('manufacturers/' + manuID + '/models').valueChanges();
    this.trim = null;
    loading.dismiss();
  }

  modelChange(modelID: string) {
    let loading = this.loadingCtrl.create({spinner:'crescent', content: 'Please Wait...'})
    loading.present();
    this.trims = this.fDB.list<Trim>('manufacturers/' + this.manufacturer.name + '/models/' + modelID + '/trims').valueChanges();
    this.trim = null;
    loading.dismiss();
  }

  log() {
    console.log(this.manufacturer, this.model, this.trim);
  }

  customizeVehicle() {
    this.navCtrl.push(CustomizationPage, {manufacturer: this.manufacturer, model: this.model, trim: this.trim});
  }
}
