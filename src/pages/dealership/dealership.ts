import { BookingPage } from './../booking/booking';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Manufacturer, Trim, Model, Color, Dealerships, Design } from './../../data_structs/structs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Content, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-dealership',
  templateUrl: 'dealership.html',
})
export class DealershipPage {
  manufacturer: string;
  model: Model;
  trim: string;
  extColor: Color;
  intColor: Color;
  dealerships: Observable<Dealerships[]>;
  total: number;
  design: Design;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private _fDb: AngularFireDatabase, private _loadingCtrl: LoadingController,
  private _modalCtr: ModalController) {
    this.design = this.navParams.get('design');
  }

  ionViewDidLoad() {
    let loader = this._loadingCtrl.create({spinner:'crescent', content: 'Please Wait...'});
    loader.present();
    this.dealerships = this._fDb.list<Dealerships>('Dealerships').valueChanges();
    loader.dismiss();
  }

  onDealership(dealership){
    this.navCtrl.push(BookingPage, {dealership: dealership, design: this.design});
  }

}
