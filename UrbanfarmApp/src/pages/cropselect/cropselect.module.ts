import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CropselectPage } from './cropselect';

@NgModule({
  declarations: [
    CropselectPage,
  ],
  imports: [
    IonicPageModule.forChild(CropselectPage),
  ],
})
export class CropselectPageModule {}
