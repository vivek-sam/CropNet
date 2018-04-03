import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeomapPage } from './geomap';

@NgModule({
  declarations: [
    GeomapPage,
  ],
  imports: [
    IonicPageModule.forChild(GeomapPage),
  ],
})
export class GeomapPageModule {}
