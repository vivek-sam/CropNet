import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
// import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';

import { BasicinfoPage } from '../../pages/basicinfo/basicinfo';
import { ProfiledashboardPage } from '../../pages/profiledashboard/profiledashboard';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';






/**
* Generated class for the GeomapPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-geomap',
  templateUrl: 'geomap.html',
})
export class GeomapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  currentPos: Geoposition;
  options: GeolocationOptions;
  places: Array<any>;
  signupBtn: any = false;
  connectBtn = false;
  searchFor: any ;
  allUsersDetails: any;
  sortedNearByDealer: any;

  resdata: any;
  errorMessage: any;
  // private secureStorage:SecureStorage;
  data: any;
  error: any;
  validUser: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private geolocation: Geolocation,
    private googleMaps: GoogleMaps,
    public restService: RestProvider,
    private storage: Storage) {

    platform.ready().then(() => {

    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad GeomapPage');
    this.storage.get('validUser').then((data) => {
      this.validUser = data;
      // alert(this.validUser);
      let mapOptions = {
        center: { lat: -34.9011, lng: -56.1645 },
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
      }
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      this.getUserPosition();
    });

  }
  // async fun(){
  //   return await this.storage.get('validUser').sync((data)=> {  this.validUser1 = data; alert(data);});
  // }

  // this.storage.get('validUser').subscribe((data) => {
  // this.validUser = data;
  // });
  // alert("abuh" + this.validUser );
  // allUsersData(){
  //   let options = {
  //     nickName : "empty object"
  //   };
  //   this.restService.allUserData(options)
  //       .subscribe(
  //       resdata => {this.allUsersDetails= resdata;  console.log(JSON.stringify(this.allUsersDetails));   },// this.locateMarkers(this.allUsersDetails);console.log(JSON.stringify(this.allUsersDetails)){ this.resdata = resdata; if (this.resdata != "") { if (this.resdata[0].Email == options.email && this.resdata[0].Email != '') this.navCtrl.push(HomePage); { console.log(JSON.stringify(this.resdata[0]['_id'])) } } else { alert('Pleas Provide valid Information') }; },
  //       error => {this.errorMessage = <any>error; console.log("res basicInfo : " + JSON.stringify(this.errorMessage ));});
  //       // console.log("rrrrrrrrrrrrrrrr : " +this.allUsersDetails);
  //
  //
  // }

  // locateMarkers(compleDetails){
  // this.allUsersDetails =  compleDetails  ;
  // let x = compleDetails[0]['Location'][0];
  // this.getDistanceFromLatLonInKm("-34.898104932269035", "-56.16222548675535",  x.lat, x.lng)
  //
  // }
  //
  //  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  //   var R = 6371; // Radius of the earth in km
  //   var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  //   var dLon = this.deg2rad(lon2-lon1);
  //   var a =
  //     Math.sin(dLat/2) * Math.sin(dLat/2) +
  //     Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
  //     Math.sin(dLon/2) * Math.sin(dLon/2)
  //     ;
  //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  //   var d = R * c; // Distance in km
  //   // alert(Math.round(Number(d)));
  // }
  //
  //  deg2rad(deg) {
  //   return deg * (Math.PI/180)
  // }
  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()

    });
    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');


    let content = "<p><b>My Location</b></p>";
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  getRestaurants(latLng) {
    var service = new google.maps.places.PlacesService(this.map);
    var request = {
      location: latLng,
      radius: 800,
      types: [this.searchFor],
      center: latLng,
      disableDefaultUI: true
    };
    return new Promise((resolve, reject) => {
      service.nearbySearch(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }

      });
    });

  }
  show() {
    // this.signupBtn = true;
  }
  createMarker(place) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: place
    });
    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
    marker.addListener('click', () => {
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
      if (this.validUser != true) {
        this.signupBtn = true;
        this.connectBtn = false;
      } else {
        this.signupBtn = false;
        this.connectBtn = true;
      }
      // alert(this.validUser);
      // this.show();
    });
    this.map.addListener('click', () => {
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
      this.signupBtn = false;
      this.connectBtn = false;
      // this.show();
    });
  }
  addMap(lat, long) {

    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
      center: latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    let options = {
      location: latLng,
      distKm: 50
    };

    this.restService.geoLocationFinder(options)
      .subscribe(
      resdata => {
        this.sortedNearByDealer = resdata;
        this.custmarker(this.sortedNearByDealer);
      },
      error => { this.errorMessage = <any>error; console.log("sortedNearByDealer : " + JSON.stringify(this.errorMessage)); });


  }

  custmarker(val) {
    for (let i = 0; i < val.length; i++) {
      let latitude = val[i].Location[0].coordinates[0];
      let Longitude = val[i].Location[0].coordinates[1];
      let pos = { lat: latitude, lng: Longitude };
      // alert(JSON.stringify(pos));
      this.createMarker(pos);
    }
    this.addMarker();
  }

  getUserPosition() {
    console.log("getting user position");
    this.options = {
      enableHighAccuracy: true
    };
    this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {

      this.currentPos = pos;

      console.log(pos);
      this.addMap(pos.coords.latitude, pos.coords.longitude);

    }, (err: PositionError) => {
      console.log("error : " + err.message);
      ;
    })
  }
  pageredirection() {
    this.navCtrl.push(BasicinfoPage);
  }
connect(){
  this.navCtrl.push(ProfiledashboardPage);
}
}
