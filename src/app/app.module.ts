import { DealershipPage } from './../pages/dealership/dealership';
import { CustomizationPage } from './../pages/customization/customization';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { FIREBASE_CONFING } from './app.firebase.config';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { Auth } from '../services/auth';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CustomizationPage,
<<<<<<< HEAD
    DealershipPage
=======
    LoginPage
>>>>>>> 66b1dc76baac9953a4668181d2b6fd9c37624399
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFING),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CustomizationPage,
<<<<<<< HEAD
    DealershipPage
=======
    LoginPage
>>>>>>> 66b1dc76baac9953a4668181d2b6fd9c37624399
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Auth
  ]
})

export class AppModule {}
