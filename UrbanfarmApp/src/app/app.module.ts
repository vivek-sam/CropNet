import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
//import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    SplashlsPage,
    GeomapPage,
    BasicinfoPage,
    CropselectPage,
    ConnectionsPage,
    ProfiledashboardPage,
    LatlngupdatePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    SplashlsPage,
    GeomapPage,
    BasicinfoPage,
    CropselectPage,
    ConnectionsPage,
    ProfiledashboardPage,
    LatlngupdatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
    GoogleMaps,
    Geolocation,
    GeomapPage,
    File,
    Transfer,
    Camera,
    FilePath,
    SecureStorage,
    IonicStorageModule
  ]
})
export class AppModule { }
