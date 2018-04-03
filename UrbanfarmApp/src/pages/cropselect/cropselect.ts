import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConnectionsPage } from '../../pages/connections/connections';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the CropselectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */




@IonicPage()
@Component({
  selector: 'page-cropselect',
  templateUrl: 'cropselect.html',
})
export class CropselectPage {
images: any;
croptTypeSelected1:any;
cropsTypeList1:any;

resdata: any;
errorMessage: any;
// private secureStorage:SecureStorage;
data:any;
error:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public restService: RestProvider) {
    console.log("crop select page : " + this.restService.userId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CropselectPage');

   this.croptTypeSelected1= [];
    this.cropsTypeList1 = [
                            {"name": "crop1", "link" : "https://wmswcd.org/wp-content/uploads/2015/04/P1020020-SIO-Cover-Crop-400x400.jpg"},
                            {"name": "crop2", "link" : "https://wmswcd.org/wp-content/uploads/2015/04/P1020020-SIO-Cover-Crop-400x400.jpg"},
                            {"name": "crop3", "link" : "https://wmswcd.org/wp-content/uploads/2015/04/P1020020-SIO-Cover-Crop-400x400.jpg"},
                            {"name": "crop4", "link" : "https://wmswcd.org/wp-content/uploads/2015/04/P1020020-SIO-Cover-Crop-400x400.jpg"},
                            {"name": "crop5", "link" : "https://wmswcd.org/wp-content/uploads/2015/04/P1020020-SIO-Cover-Crop-400x400.jpg"},
                            {"name": "crop6", "link" : "https://wmswcd.org/wp-content/uploads/2015/04/P1020020-SIO-Cover-Crop-400x400.jpg"}
                        ];
  }
  // cropselect(){
  //
  // };
  updateCrops(crop){
    console.log(JSON.stringify(crop));
    if(crop.selected){
    this.croptTypeSelected1.push(crop.name);
    console.log(JSON.stringify(this.croptTypeSelected1));
  }else{
      this.croptTypeSelected1.splice(  this.croptTypeSelected1.indexOf(crop.name), 1);
      console.log(JSON.stringify(this.croptTypeSelected1));
  }

  }

  cropselect() {
    let options = {
      basicInfoId : this.restService.userId,
      cropType1: this.croptTypeSelected1
    };
    if (options.cropType1 == ' ' || typeof (options.cropType1) == "undefined") {
      alert('Provide valid info');
    } else {
      //console.log( JSON.stringify(options));
      this.restService.cropSelect(options)
        .subscribe(
          resdata => {this.resdata= resdata; console.log("res basicInfo : " + JSON.stringify(this.resdata ));this.pageredirection();},//{ this.resdata = resdata; if (this.resdata != "") { if (this.resdata[0].Email == options.email && this.resdata[0].Email != '') this.navCtrl.push(HomePage); { console.log(JSON.stringify(this.resdata[0]['_id'])) } } else { alert('Pleas Provide valid Information') }; },
          error => this.errorMessage = <any>error);
    }
    this.pageredirection();
  }



  pageredirection(){
    this.navCtrl.push(ConnectionsPage);
  }

}
