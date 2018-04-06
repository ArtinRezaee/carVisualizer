import { ProgressBarComponent } from './../../components/progress-bar/progress-bar';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomizationPage } from './customization';

@NgModule({
  declarations: [
    CustomizationPage,
    ProgressBarComponent
  ],
  imports: [
    IonicPageModule.forChild(CustomizationPage),
  ],
})
export class CustomizationPageModule {}
