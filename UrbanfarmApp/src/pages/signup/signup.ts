import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { HomePage } from '../../pages/home/home';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  name:any;
  email: any;
  password: any;
  resdata:any;
  errorMessage:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: RestProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signup() {
    let options = {
      name: this.name,
      email: this.email,
      password: this.password
     };
     if(options.email == ' ' || typeof(options.email) == "undefined"){
       alert('Provide valid info');
     }else{
       this.restService.Signup(options)
          .subscribe(
            resdata => {this.resdata = resdata; if(this.resdata != "" && options.email != '') {if(this.resdata.Email == options.email && this.resdata.Email != 'undefined' ){this.navCtrl.push(HomePage);}else {alert('User already Exist,s')}}else{alert('Pleas Provide valid Information')};},
            error =>  this.errorMessage = <any>error);
     }
    //console.log( JSON.stringify(options));

  }
}
// if(this.resdata[0].Email == options.email && this.resdata[0].Email != '' )this.navCtrl.push(HomePage); {console.log(JSON.stringify(this.resdata[0]['_id']))}
