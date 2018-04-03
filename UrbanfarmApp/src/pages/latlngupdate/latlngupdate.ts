import { Component , NgZone, ViewChild ,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ActionSheetController, ToastController, Platform, Loading } from 'ionic-angular';

import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';
import { RestProvider } from '../../providers/rest/rest';

import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
// import {SecureStorage} from 'ionic-native';

// import { ViewChild } from '@angular/core'

// import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';

// import { Geolocation } from '@ionic-native/geolocation';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { CropselectPage } from '../../pages/cropselect/cropselect';


/**
 * Generated class for the BasicinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-latlngupdate',
  templateUrl: 'latlngupdate.html',
})
export class LatlngupdatePage {
  @ViewChild('map1') mapElement: ElementRef;

  lastImage: string = null;
  loadingimg: Loading;
  locationSelected: any;

  map: any;
  markers: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  loading: any;
  xyz :any;

  nickName:any;
  languages:any = "English";
  imageUrl:any = "somevalue";
  selectlocationLatLang:any;
  phoneNumber:any;


currentPos : Geoposition;
options : GeolocationOptions;
places : Array<any> ;
showMe:any = true;
searchFor:any = "Farmers and crops";

showBasicInfoPage:any=  false;
// showMe : fales;
resdata: any;
errorMessage: any;
// private secureStorage:SecureStorage;
data:any;
error:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public zone: NgZone,
              public geolocation: Geolocation,
              public loadingCtrl: LoadingController,

              private camera: Camera,
              private transfer: Transfer,
              private file: File,
              private filePath: FilePath,
              public actionSheetCtrl: ActionSheetController,
              public toastCtrl: ToastController,
              public platform: Platform,
              private googleMaps: GoogleMaps,
              public restService: RestProvider,
             private secureStorage:SecureStorage

            ) {
                this.geocoder = new google.maps.Geocoder;
                let elem = document.createElement("div")
                this.GooglePlaces = new google.maps.places.PlacesService(elem);
                this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
                this.autocomplete = {input: ''  };
                this.autocompleteItems = [];
                this.markers = [];
                this.loading = this.loadingCtrl.create();

                this.platform.ready().then(() => {
                  this.secureStorage.create('my_store_name')
                  .then((storage: SecureStorageObject) => {

                     storage.get('key')
                       .then(
                           data => console.log(data),
                         error => console.log(error)
                     );

                     storage.set('key', 'value')
                       .then(
                        data => console.log(data),
                         error => console.log(error)
                     );

                     storage.remove('key')
                     .then(
                         data => console.log(data),
                         error => console.log(error)
                       );

                        });
                });
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasicinfoPage');

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: {lat: -34.9011, lng: -56.1645},
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    });
      this.locationSelected = {lat: 0, lng: 0};
     // this.locationSelected = {lat: 0, lng: 0};
    this.map.addListener('click', (e)=> {
       // this.map.Marker.remove();
       this.locationSelected = e.latLng ;
       // this.locationSelected = {lat: 0, lng: 0};
      this.selectlocation(e.latLng);
      // alert(this.locationSelected);
   });
    // this.getUserPosition();



  }

  ionViewDidEnter(){

   //  this.map.addListener('click', (e)=> {
   //     // this.map.Marker.remove();
   //    this.selectlocation(e.latLng)
   //
   // });

    // this.getUserPosition();

  }
  latLngUpdate(){

    let options = {
      language :this.languages,
      location :  this.locationSelected,
      basicInfoId : this.restService.userId,
    };


    this.restService.locationUpdate(options)
      .subscribe(
        resdata => {this.resdata= resdata; console.log("res basicInfo : " + JSON.stringify(this.resdata )); console.log(JSON.stringify(options)); this.pageredirection();},
        error => this.errorMessage = <any>error);
  }

showBasicInfoPagefun(){
  this.showBasicInfoPage=true;
}



  selectlocation(latLng){

    this.locationSelected =  latLng ;
    // this.locationSelected = {lat: 0, lng: 0};
    this.clearMarkers();
    let marker = new google.maps.Marker({
      position: latLng,
      map: this.map
    });
    this.markers.push(marker);
    // this.map.setCenter(latLng);
      // let marker = new google.maps.Marker({
      //   position: latLng,
      //   map: map
      // });
      // this.map.panTo(latLng);
  }

  tryGeolocation(){
    this.loading.present();
    this.clearMarkers();//remove previous markers
    this.geolocation.getCurrentPosition().then((resp) => {
      let pos = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      this.locationSelected = pos ;
      // this.locationSelected = {lat: 0, lng: 0};
      // console.logo(pos);
      let marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        title: 'I am here!'
      });
      this.markers.push(marker);
      this.map.setCenter(pos);
      this.loadingimg.dismiss();

    }).catch((error) => {
      console.log('Error getting location', error);
      this.loading.dismiss();
    });
  }

  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        if(predictions){
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        }
    });
  }

  selectSearchResult(item){
    this.clearMarkers();
    this.autocompleteItems = [];

    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        // let position = {
        //     lat: results[0].geometry.location.lat,
        //     lng: results[0].geometry.location.lng
        // };
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map
        });
          this.locationSelected = results[0].geometry.location;
          // this.locationSelected = {lat: 0, lng: 0};
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    })
  }

  clearMarkers(){
    for (var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i])
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }
  /////////////////////////////first page ///////////////////////
  addMarker(){

      let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()

      });
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');


      let content = "<p>This is your current position !</p>";
      let infoWindow = new google.maps.InfoWindow({
      content: content
      });

      google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
      });

  }


  getRestaurants(latLng){
      var service = new google.maps.places.PlacesService(this.map);
      var request = {
          location : latLng,
          radius : 800 ,
          types: [this.searchFor],
          center: latLng,
          disableDefaultUI: true
      };
      return new Promise((resolve,reject)=>{
          service.nearbySearch(request,function(results,status){
              if(status === google.maps.places.PlacesServiceStatus.OK)
              {
                  resolve(results);
              }else
              {
                  reject(status);
              }

          });
      });

  }
  showConnect() {
    this.showMe = false;
  }
  createMarker(place){
      let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location
      });
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
      marker.addListener('click', () => {
        //this.someProperty = Math.random();
          marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
          this.showConnect();
      });

  }
  addMap(lat,long){

      let latLng = new google.maps.LatLng(lat, long);

      let mapOptions = {
      center: latLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      // this.map = new google.maps.Map(  document.getElementById('map'), mapOptions);////to append the locations
      this.map.addListener('click', (e)=> {
         // this.map.Marker.remove();
         this.locationSelected = e.latLng;
         // this.locationSelected = {lat: 0, lng: 0};
        this.selectlocation(e.latLng);
        // alert(this.locationSelected);
     });



      this.getRestaurants(latLng).then((results : Array<any>)=>{
          this.places = results;
          for(let i = 0 ;i < results.length ; i++)
          {
            // if(this.searchFor != " "){
              this.createMarker(results[i]);
           }
      },(status)=>console.log(status));

      this.addMarker();

  }

  getUserPosition(){
    console.log("getting user position");
      this.options = {
      enableHighAccuracy : true
      };
      this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

          this.currentPos = pos;

          console.log(pos);
          this.addMap(pos.coords.latitude,pos.coords.longitude);
          this.locationSelected = { "lat" : pos.coords.latitude, "lng" : pos.coords.longitude };
          // this.locationSelected = {lat: 0, lng: 0};

      },(err : PositionError)=>{
          console.log("error : " + err.message);
      ;
      })
  }


  pageredirection(){
    this.navCtrl.push(CropselectPage);
  }
  connect(){

  }
}
