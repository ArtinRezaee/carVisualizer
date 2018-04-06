import { ProgressBarComponent } from './../../components/progress-bar/progress-bar';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingConfirmationPage } from './booking-confirmation';

@NgModule({
  declarations: [
    BookingConfirmationPage,
    ProgressBarComponent
  ],
  imports: [
    IonicPageModule.forChild(BookingConfirmationPage),
  ],
})
export class BookingConfirmationPageModule {}
