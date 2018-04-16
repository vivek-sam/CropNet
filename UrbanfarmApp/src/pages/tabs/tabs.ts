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

  imageLink = ["assets/imgs/homemarker.png", "assets/imgs/profile-green.png", "assets/imgs/search1.png"];


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
    this.updateAccountTab();
});
  }


  updateAccountTab() : void {
      let array = document.getElementsByClassName('tabbar');
      let tabbar = array[0];
      for(let i =1 ; i<=3 ; i++){
        let element = tabbar.childNodes[i];
        if(element) {
            element.removeChild(element.childNodes[1]);
            let img = document.createElement("img");
            img.setAttribute("class", "tab-icon-custom tab-button-icon icon icon-md");
            img.setAttribute("src", this.imageLink[i-1]);
            img.setAttribute("height", '28px');
            img.setAttribute("width", '28px');
            img.setAttribute("style", "border-radius : 100%; margin:2px;");

            element.insertBefore(img, element.childNodes[1]);
        }
      }
  }
}
