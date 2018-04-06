import { ProgressBarComponent } from './../../components/progress-bar/progress-bar';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingPage } from './booking';

@NgModule({
  declarations: [
    BookingPage,
    ProgressBarComponent
  ],
  imports: [
    IonicPageModule.forChild(BookingPage),
  ],
})
export class BookingPageModule {}
