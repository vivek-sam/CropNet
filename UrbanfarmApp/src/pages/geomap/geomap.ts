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

declare var google: any;
@IonicPage()
@Component({
  selector: 'page-geomap',
  templateUrl: 'geomap.html',
})
export class GeomapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  image: any;
  currentPos: Geoposition;
  options: GeolocationOptions;
  places: Array<any>;
  signupBtn: any = false;
  connectBtn = false;
  searchFor: any;
  allUsersDetails: any;
  sortedNearByDealer: any;

  resdata: any;
  errorMessage: any;
  // private secureStorage:SecureStorage;
  data: any;
  error: any;
  validUser: any;
  toggleList: any = false;
  pbound: any;

  markerimg: any[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      profileImage: "http://www.gravatar.com/avatar/d735414fa8687e8874783702f6c96fa6?s=90&d=identicon&r=PG"
    },
    {
      lat: 51.674038,
      lng: 7.815092,
      label: 'B',
      profileImage: "http://placekitten.com/90/90"
    }
  ];
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
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
      }
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      this.getUserPosition();
    });

  }

  toggle() {
    if (this.toggleList == true) {
      this.toggleList = false;
    } else {
      this.toggleList = true;
    }
  }

  addMarker() {

    // this.image = {
    //           url: 'assets/imgs/homeicon.png',
    //           // This marker is 20 pixels wide by 32 pixels high.
    //           size: new google.maps.Size(200, 200),
    //           // The origin for this image is (0, 0).
    //           origin: new google.maps.Point(0, 0),
    //           // The anchor for this image is the base of the flagpole at (0, 32).
    //           anchor: new google.maps.Point(0, 0)
    //         };
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      icon: this.image

    });
    marker.setIcon('assets/imgs/bluemarker.png');
    // marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');


    let content = "<p><b>My Location</b></p>";
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  show() {
    // this.signupBtn = true;
  }
  createMarker(place, userId_) {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: place
    });
    if (this.restService.userId == userId_) { marker.setIcon('assets/imgs/homeicon.png'); } else {
      // marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
      marker.setIcon('assets/imgs/redmarker.png');
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
        // marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
        marker.setIcon('assets/imgs/redmarker.png');
        this.signupBtn = false;
        this.connectBtn = false;
        // this.show();
      });
    }
  }
  addMap(lat, long) {

    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
      center: latLng,
      zoom: 11,
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
        console.log(JSON.stringify(this.sortedNearByDealer));
      },
      error => { this.errorMessage = <any>error; console.log("sortedNearByDealer : " + JSON.stringify(this.errorMessage)); });


  }

  custmarker(val) {
    for (let i = 0; i < val.length; i++) {
      let latitude = val[i].Location[0].coordinates[0];
      let Longitude = val[i].Location[0].coordinates[1];
      let pos = { lat: latitude, lng: Longitude };
      let userId_ = val[i]._id;
      // alert(JSON.stringify(pos));
      this.createMarker(pos, userId_);
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

      console.log(pos + "current");
      this.addMap(pos.coords.latitude, pos.coords.longitude);

    }, (err: PositionError) => {
      console.log("error : " + err.message);
      ;
    })
  }
  pageredirection() {
    this.navCtrl.push(BasicinfoPage);
  }
  connect() {
    this.navCtrl.push(ProfiledashboardPage);
  }
}
