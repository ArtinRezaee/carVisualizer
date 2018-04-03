import { AngularFireDatabase } from 'angularfire2/database';
import { Color } from './../../data_structs/color';
import { Observable } from 'rxjs/Observable';
import { Manufacturer } from './../../data_structs/manufacturer';
import { Model } from './../../data_structs/model';
import { Trim } from './../../data_structs/trim';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-customization',
  templateUrl: 'customization.html',
})
export class CustomizationPage {
  trim: Trim;
  mod: Model;

  manufacturer: Manufacturer;
  extColors: Color[] = [];
  intColors: Color[] = [];

  extClr: Color = null;
  intClr: Color = null;

  @ViewChild('sliderOne') sliderOne: Slides;
  @ViewChild('sliderTwo') sliderTwo: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private _fDb: AngularFireDatabase) {
    this.manufacturer = this.navParams.get('manufacturer');
    this.mod = this.navParams.get('model');
    this.trim = this.navParams.get('trim');
  }

  ionViewWillEnter() {
    this._fDb.list<Color>('manufacturers/'+ this.manufacturer.name  + '/models/' + this.mod.id + '/colors',
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
    
    this._fDb.list<Color>('manufacturers/'+ this.manufacturer.name  + '/models/' + this.mod.id + '/colors', 
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

    this.sliderOne.lockSwipes(true);
    this.sliderTwo.lockSwipes(true);
  }

  exteriorChange(color: Color) {
    this.sliderOne.lockSwipes(false);
    this.sliderOne.slideTo(this.extColors.indexOf(color), 500);
    this.sliderOne.lockSwipes(true);
  }

  interiorChange(color: Color) {
    this.sliderTwo.lockSwipes(false);
    this.sliderTwo.slideTo(this.intColors.indexOf(color), 500);
    this.sliderTwo.lockSwipes(true);
  }

}
