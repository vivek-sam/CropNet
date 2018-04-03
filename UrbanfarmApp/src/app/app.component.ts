import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClient } from '@angular/common/http';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SplashlsPage } from '../pages/splashls/splashls';
import { GeomapPage } from '../pages/geomap/geomap';
import { BasicinfoPage } from '../pages/basicinfo/basicinfo';
import { CropselectPage } from '../pages/cropselect/cropselect';
import { ConnectionsPage } from '../pages/connections/connections';
import { ProfiledashboardPage } from '../pages/profiledashboard/profiledashboard';
import { LatlngupdatePage } from '../pages/latlngupdate/latlngupdate';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any  = TabsPage ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
