import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProfiledashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profiledashboard',
  templateUrl: 'profiledashboard.html',
})
export class ProfiledashboardPage {
  b64img: any ;
  userId: any;
  resdata: any;
  errorMessage: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: RestProvider, private storage: Storage) {
    this.loadProfileDetails("5ad75540514840777bf0ae6e");
    // console.log("userid" +  this.restService.userId );
    // this.loadProfileDetails("5ad73428edd3225692b90839");


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiledashboardPage');
  }

  loadProfileDetails(userid) {
    this.restService.basicinfoById(userid)
      .subscribe(
      resdata => {
        this.resdata = resdata;
        // let id = this.resdata[0].ImageFileId;
        // console.log(JSON.stringify( this.resdata[0].ImageFileId));
          // this.loadProfileImage(this.resdata[0].ImageFileId);
           this.loadProfileImage("5ad75535514840777bf0ae66");

      },
      error => { this.errorMessage = <any>error; console.log("res basicInfo : " + this.errorMessage); });
  }
  loadProfileImage(id) {

    this.restService.profileImage(id)
      .subscribe(
      resdata => {
        this.resdata = resdata;
        this.b64img = resdata;
        // console.log("somthinf"+  this.resdata);
      },
      error => { this.errorMessage = <any>error; console.log("res basicInfo : " + this.errorMessage); });
  }
}
