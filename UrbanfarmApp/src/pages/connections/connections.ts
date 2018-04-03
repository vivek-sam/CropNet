import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfiledashboardPage } from '../../pages/profiledashboard/profiledashboard';
import { BasicinfoPage } from '../../pages/basicinfo/basicinfo';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the ConnectionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connections',
  templateUrl: 'connections.html',
})
export class ConnectionsPage {
  connections:any;
  connectionStatus:any = true;
  resdata: any;
  errorMessage: any;
  // private secureStorage:SecureStorage;
  data:any;
  error:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public restService: RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectionsPage');
      this.connections =[
                        {"name": "WhatsApp", "id" :"+91 -9876543210" , "status" : true },
                        {"name": "Facebook", "id" :"someone@facebook.com.com" , "status" : true },
                        {"name": "Skype", "id" :"someone@skype.com" , "status" : false },
                        {"name": "Google hangouts", "id" :"someone@google.com" , "status" : true }
                      ];

  }
  Connections(){
    this.ConnectionsStatus();


    let options = {
      basicInfoId : this.restService.userId,
      connection : this.connections
    };
    console.log(JSON.stringify(options));
    if (options.connection == ' ' || typeof (options.connection) == "undefined") {
      alert('Provide valid info');
    } else {
      //console.log( JSON.stringify(options));
      this.restService.connections(options)
        .subscribe(
          resdata => {this.resdata= resdata; console.log("res basicInfo : " + JSON.stringify(this.resdata ));this.pageredirection();},//{ this.resdata = resdata; if (this.resdata != "") { if (this.resdata[0].Email == options.email && this.resdata[0].Email != '') this.navCtrl.push(HomePage); { console.log(JSON.stringify(this.resdata[0]['_id'])) } } else { alert('Pleas Provide valid Information') }; },
          error => this.errorMessage = <any>error);
    }
    this.pageredirection();
  }

  ConnectionsStatus(){
    let options = {
      basicInfoId : this.restService.userId,
      status : this.connectionStatus
    };

    this.restService.connectionStatus(options)
      .subscribe(
        resdata => {this.resdata= resdata; console.log("res basicInfo : " + JSON.stringify(this.resdata ));},//{ this.resdata = resdata; if (this.resdata != "") { if (this.resdata[0].Email == options.email && this.resdata[0].Email != '') this.navCtrl.push(HomePage); { console.log(JSON.stringify(this.resdata[0]['_id'])) } } else { alert('Pleas Provide valid Information') }; },
        error => this.errorMessage = <any>error);
  }


  pageredirection(){
    this.navCtrl.push(ProfiledashboardPage);
    // alert(JSON.stringify(this.connections));
  }

}
