import { Bookings } from './../../data_structs/structs';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AppointmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appointments',
  templateUrl: 'appointments.html',
})
export class AppointmentsPage {

  bookings: Observable<Bookings[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _fdb: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    this.bookings = this._fdb.list<Bookings>("Bookings").valueChanges();
  }

}
