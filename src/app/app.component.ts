import { HomePage } from './../pages/home/home';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') nav : NavController;

  rootPage: any = HomePage;
  homePage = HomePage;

  isLoggedIn = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onHome() {
    this.nav.setPages([{page: HomePage}]);
  }

  onSavedCars() {
    
  }

  onLogin() {
    
  }

  onLogOut() {
    
  }
}

