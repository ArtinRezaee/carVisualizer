import { HomePage } from './../pages/home/home';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  @ViewChild('nav') nav : NavController;

  homePage = HomePage;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
  private _menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openMenu(){
    this._menuCtrl.open();
  }

  onHome(){
    this.nav.setPages([{page: HomePage}]);
    this._menuCtrl.close();
  }

  onSavedCars(){
    this._menuCtrl.close();
    //ToDo
  }

  onLogin(){
    this._menuCtrl.close();
    //Todo
  }

  onLogOut(){
    this._menuCtrl.close();
    //TODO
  }

}

