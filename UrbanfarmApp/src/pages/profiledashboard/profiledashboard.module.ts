import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfiledashboardPage } from './profiledashboard';

@NgModule({
  declarations: [
    ProfiledashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfiledashboardPage),
  ],
})
export class ProfiledashboardPageModule {}
