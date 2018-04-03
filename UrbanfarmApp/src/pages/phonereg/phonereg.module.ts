import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhoneregPage } from './phonereg';

@NgModule({
  declarations: [
    PhoneregPage,
  ],
  imports: [
    IonicPageModule.forChild(PhoneregPage),
  ],
})
export class PhoneregPageModule {}
