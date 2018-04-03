import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { HomePage } from '../../pages/home/home';
import { GooglePlus } from '@ionic-native/google-plus';
//import { NavController, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [GooglePlus]
})
export class LoginPage {

  displayName: any;
  // email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;

  isLoggedIn: boolean = false;


  email: any;
  password: any;
  resdata: any;
  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: RestProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private googlePlus: GooglePlus) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let options = {
      email: this.email,
      password: this.password
    };
    if (options.email == ' ' || typeof (options.email) == "undefined") {
      alert('Provide valid info');
    } else {
      //console.log( JSON.stringify(options));
      this.restService.loginAuth(options)
        .subscribe(
        resdata => { this.resdata = resdata; if (this.resdata != "") { if (this.resdata[0].Email == options.email && this.resdata[0].Email != '') this.navCtrl.push(HomePage); { console.log(JSON.stringify(this.resdata[0]['_id'])) } } else { alert('Pleas Provide valid Information') }; },
        error => this.errorMessage = <any>error);
    }
  }


  glogin() {
    this.googlePlus.login({})
      .then(res => {
        console.log(res);
        this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;

        this.isLoggedIn = true;
      })
      .catch(err => console.error(err));
  }

  glogout() {
    this.googlePlus.logout()
      .then(res => {
        console.log(res);
        this.displayName = "";
        this.email = "";
        this.familyName = "";
        this.givenName = "";
        this.userId = "";
        this.imageUrl = "";

        this.isLoggedIn = false;
      })
      .catch(err => console.error(err));
  }
  // this.navCtrl.push(HomePage);
  // login() {
  //   let options = {
  //     Email: this.email,
  //     Password: this.password
  //   };
  //   this.restService.loginAuth(options).then((data) => {
  //
  //       loading.dismiss();
  //
  //       if(typeof(data[0]) === "undefined"){
  //           let alert = this.alertCtrl.create({
  //               title: 'Oops!',
  //               subTitle: 'Sorry, no rooms could be found for your search criteria.',
  //               buttons: ['Ok']
  //           });
  //
  //           alert.present();
  //       } else {
  //           this.nav.push(AvailableRoomsPage, {
  //               rooms: data,
  //               details: options
  //           });
  //       }
  //
  //   }, (err) => {
  //       console.log(err);
  //   });
  //   console.log(options);
  // }

}
