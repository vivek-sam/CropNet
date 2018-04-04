import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  searchFor:any;
  searcBy:any;
  searchResult:any;
  resNickName:any;
  resLanguages:any;
  resPhoneNumber:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }


  searchForAndBy(){
    // this.searchFor;
    let options = {
      name: this.searchFor
    };
    this.restService.searchForAndBy(options)
      .subscribe(
      resdata => {
      if (resdata.length > 0) {
        this.searchResult = resdata[0];
        this.resNickName = this.searchResult.NickName;
        this.resLanguages = this.searchResult.Languages;
        this.resPhoneNumber = this.searchResult.PhoneNumber;
        console.log(JSON.stringify(resdata));
      }else{
        alert("No results found");
      }

      },
      error => { this.errorMessage = <any>error; console.log("sortedNearByDealer : " + JSON.stringify(this.errorMessage)); });
  }

}
