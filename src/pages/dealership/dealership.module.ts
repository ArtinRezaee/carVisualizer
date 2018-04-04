import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealershipPage } from './dealership';

@NgModule({
  declarations: [
    DealershipPage,
  ],
  imports: [
    IonicPageModule.forChild(DealershipPage),
  ],
})
export class DealershipPageModule {}
