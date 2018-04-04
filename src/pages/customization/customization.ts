import { DealershipPage } from './../dealership/dealership';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { Slides } from 'ionic-angular';

import { Manufacturer, Model, Trim, Color } from './../../data_structs/structs';

@IonicPage()
@Component({
  selector: 'page-customization',
  templateUrl: 'customization.html',
})
export class CustomizationPage {
  trim: Trim;
  model: Model;
  manufacturer: Manufacturer;

  extColors: Color[] = [];
  intColors: Color[] = [];

  extClr: Color = null;
  intClr: Color = null;

  desktop: boolean = false;

  @ViewChild('sliderOne') sliderOne: Slides;
  @ViewChild('sliderTwo') sliderTwo: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
    public _fDb: AngularFireDatabase, private loadingCtrl: LoadingController) {
      this.manufacturer = this.navParams.get('manufacturer');
      this.model = this.navParams.get('model');
      this.trim = this.navParams.get('trim');
    }

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({spinner:'crescent', content: 'Please Wait...'})
    loading.present();

    this.desktop = this.platform.is('core');

    this.manufacturer = this.navParams.get('manufacturer');
    this.model = this.navParams.get('model');
    this.trim = this.navParams.get('trim');

    this.sliderOne.lockSwipes(true);
    this.sliderTwo.lockSwipes(true);

    this._fDb.list<Color>('manufacturers/'+ this.manufacturer.name  + '/models/' + this.model.id + '/colors',
     ref => ref.orderByChild('type').equalTo('ext')).valueChanges().subscribe(list => {
      this.extColors = [];
      list.forEach(each => {
        this.extColors.push({
          id: each.id,
          name: each.name,
          type: each.type,
          src: each.src,
          price: each.price
        });
      });
    });
    
    this._fDb.list<Color>('manufacturers/'+ this.manufacturer.name  + '/models/' + this.model.id + '/colors', 
      ref => ref.orderByChild('type').equalTo('int')).valueChanges().subscribe(list => {
      this.intColors = [];
      list.forEach(each => {
        this.intColors.push({
          id: each.id,
          name: each.name,
          type: each.type,
          src: each.src,
          price: each.price
        });
      });
    });

    this.intClr = this.intColors[0];
    this.extClr = this.extColors[0];
    
    loading.dismiss();
  }

  exteriorChange(color: Color) {
    this.sliderOne.lockSwipes(false);
    this.extClr = color;
    this.sliderOne.slideTo(this.extColors.indexOf(color), 500);
    this.sliderOne.lockSwipes(true);
  }

  interiorChange(color: Color) {
    this.sliderTwo.lockSwipes(false);
    this.intClr = color;
    this.sliderTwo.slideTo(this.intColors.indexOf(color), 500);
    this.sliderTwo.lockSwipes(true);
  }

  goToDealerships(){
    this.navCtrl.push(DealershipPage, {manufacturer: this.manufacturer, model: this.model, extColor: this.extClr, intColor: this.intClr});
  }
}
