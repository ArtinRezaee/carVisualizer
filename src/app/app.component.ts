import { HomePage } from './../pages/home/home';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, ModalController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPage } from './../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') nav : NavController;

  rootPage: any = HomePage;
  homePage = HomePage;

  isLoggedIn = false;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public fAuth: AngularFireAuth, public modalCtrl: ModalController, public loader: LoadingController) {
      
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      this.fAuth.authState.subscribe((auth) => {
        if(auth)
          this.isLoggedIn = true;
        else 
          this.isLoggedIn = false;
      });
    });
  }

  onHome() {
    this.nav.setPages([{page: HomePage}]);
  }

  onSavedCars() {
    
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
}

