import { ProgressBarComponent } from './../../components/progress-bar/progress-bar';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealershipPage } from './dealership';

@NgModule({
  declarations: [
    DealershipPage,
    ProgressBarComponent
  ],
  imports: [
    IonicPageModule.forChild(DealershipPage),
  ],
})
export class DealershipPageModule {}
