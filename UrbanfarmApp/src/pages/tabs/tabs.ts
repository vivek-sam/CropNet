import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { GeomapPage } from '../geomap/geomap';
import { BasicinfoPage } from '../basicinfo/basicinfo';
import { ProfiledashboardPage } from '../profiledashboard/profiledashboard';
import { SearchPage } from '../search/search';


import { RestProvider } from '../../providers/rest/rest';

import { Storage } from '@ionic/storage';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = GeomapPage;
  tab2Root:any;
  tab3Root = SearchPage;


  constructor(private storage: Storage,  public restService: RestProvider) {
    // this.storage.set('validUser', false);

    this.storage.get('validUser').then((data) => {
      if(data == true){
      this.tab2Root = ProfiledashboardPage  ;
    }else{
      this.tab2Root = BasicinfoPage  ;
    }
  });
  this.storage.get('userId').then((data) => {
    this.restService.userId= data;
});
  }
}
