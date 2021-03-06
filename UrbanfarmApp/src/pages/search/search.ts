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
  searchFor: any;
  searchBy: any = 'name';
  searchResult: any;
  resNickName: any;
  resLanguages: any;
  resPhoneNumber: any;
  cropsTypeList1: any;


  resdata: any;
  errorMessage: any;
  // private secureStorage:SecureStorage;
  data: any;
  error: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    this.cropsTypeList1 = [
      { "name": "crop1", "link": "assets/imgs/veg.png" },
      { "name": "crop2", "link": "assets/imgs/veg.png" },
      { "name": "crop3", "link": "assets/imgs/veg.png" },
      { "name": "crop4", "link": "assets/imgs/veg.png" },
      { "name": "crop5", "link": "assets/imgs/veg.png" },
      { "name": "crop6", "link": "assets/imgs/veg.png" }
    ];
  }


  searchForAndBy() {
    // this.searchFor;
    let options = {
      searchFor: this.searchFor,
      searchBy: this.searchBy
    };
    this.restService.searchForAndBy(options)
      .subscribe(
      resdata => {
        if (resdata.length > 0) {
          this.searchResult = resdata;
          // this.resNickName = this.searchResult.NickName;
          // this.resLanguages = this.searchResult.Languages;
          // this.resPhoneNumber = this.searchResult.PhoneNumber;
          // console.log(JSON.stringify(resdata));
        } else {
          alert("No results found");
        }

      },
      error => { this.errorMessage = <any>error; console.log("sortedNearByDealer : " + JSON.stringify(this.errorMessage)); });
  }

}
