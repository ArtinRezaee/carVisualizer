import { HomePage } from './../pages/home/home';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, ModalController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPage } from './../pages/login/login';
import { Auth } from '../services/auth';
import { AppointmentsPage } from '../pages/appointments/appointments';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') nav : NavController;

  rootPage: any = HomePage;
  homePage = HomePage;

  isLoggedIn = false;

  access: number = 2;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public fAuth: AngularFireAuth, public modalCtrl: ModalController, public loader: LoadingController,
    private _auth: Auth) {
      
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onHome() {
    this.nav.setPages([{page: HomePage}]);
  }

  onBookings() {
    this.nav.push(AppointmentsPage);
  }

  onLogin() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }

  onLogOut() {
    let loader = this.loader.create({
      spinner: 'dots',
      content: 'Logging out',
    });
    loader.present(); 
    this.fAuth.auth.signOut();
    loader.dismiss();
  }

  refresh(){
    this.access = this._auth.getAccess();
    this.isLoggedIn = this._auth.isLoggedIn();
  }
}

