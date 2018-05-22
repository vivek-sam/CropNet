Crop DB & Server Hosted online... 
Host : viveksam.southindia.cloudapp.azure.com 
userID : nodeuser 
pass : nodeuser

Build Instuctions Building apk : ionic cordova build android 
Building Release apk : ionic cordova build --release android (https://ionicframework.com/docs/v1/guide/publishing.html)

Code Location : https://github.com/vivek-sam/CropNet.git)

Extra plugins needed for build ...
ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic/storage

ionic cordova plugin add cordova-plugin-request-location-accuracy
npm install --save @ionic-native/location-accuracy
