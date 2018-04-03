import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BasicinfoPage } from './basicinfo';

@NgModule({
  declarations: [
    BasicinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(BasicinfoPage),
  ],
})
export class BasicinfoPageModule {}
