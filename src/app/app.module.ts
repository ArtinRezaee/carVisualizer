import { BookingConfirmationPage } from './../pages/booking-confirmation/booking-confirmation';
import { BookingPage } from './../pages/booking/booking';
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
import { DatePicker } from '@ionic-native/date-picker';

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
    DealershipPage,
    LoginPage,
    BookingPage,
    BookingConfirmationPage
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
    DealershipPage,
    LoginPage,
    BookingPage,
    BookingConfirmationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Auth,
    DatePicker
  ]
})

export class AppModule {}
