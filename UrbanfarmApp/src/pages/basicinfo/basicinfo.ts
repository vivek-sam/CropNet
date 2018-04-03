import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController, ToastController, Platform, Loading } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { CropselectPage } from '../../pages/cropselect/cropselect';
import { LatlngupdatePage } from '../../pages/latlngupdate/latlngupdate';

import { Storage } from '@ionic/storage';
declare var google: any;
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-basicinfo',
  templateUrl: 'basicinfo.html',
})
export class BasicinfoPage {
  @ViewChild('map') mapElement: ElementRef;

  lastImage: string = null;
  loadingimg: Loading;
  loading:any;

  nickName: any;
  languages: any = "English";
  imageUrl: any = "somevalue";
  phoneNumber: any;
  showBasicInfoPage: any = false;
  resdata: any;
  errorMessage: any;
  data: any;
  error: any;
  validUser: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public zone: NgZone,
    public loadingCtrl: LoadingController,
    public restService: RestProvider ,

    private camera: Camera,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    private storage: Storage


  ) {
    this.loading = this.loadingCtrl.create();

    this.platform.ready().then(() => {

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasicinfoPage');
  }

  ionViewDidEnter() {
  }
  basicinfo() {
    let options = {
      nickName: this.nickName,
      imageUrl: "this.imageUrl",
      phoneNumber: this.phoneNumber,
      connections: 'false'
    };
    console.log(JSON.stringify(options));
    if (options.nickName == ' ' || typeof (options.nickName) == "undefined") {
      alert('Provide valid info');
    } else {
      this.restService.basicInfo(options)
        .subscribe(
        resdata => {
          this.resdata = resdata;
          console.log("res basicInfo : " + this.resdata._id);
          this.restService.userId = this.resdata._id;
          this.storage.set('validUser', true);
          this.storage.set('userId', this.resdata._id);
          this.pageredirection();
        },
        error => { this.errorMessage = <any>error; console.log("res basicInfo : " + JSON.stringify(this.errorMessage)); });
    }
    this.pageredirection();
  }



  pageredirection() {
    this.navCtrl.push(LatlngupdatePage);
  }

  //////////////////////image uploading /////////////////////////////////////////
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }



  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return 'http://www.alrisalahschool.com/wp-content/uploads/2017/06/profile-image-default-200x200.jpg';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage() {
    // Destination URL
    var url = "http://localhost:8100/ionic-lab/";

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    // File name only
    var filename = this.lastImage;
    this.imageUrl = url + targetPath + filename;
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': filename }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loadingimg = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loadingimg.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loadingimg.dismissAll()
      this.presentToast('Image succesful uploaded.');
    }, err => {
      this.loadingimg.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }



}
