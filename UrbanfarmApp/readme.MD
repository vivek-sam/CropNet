Crop DB & Server Hosted online... 
Host : viveksam.southindia.cloudapp.azure.com 
userID : nodeuser 
pass : nodeuser

Build Instuctions Building apk : ionic cordova build android 


Code Location : https://github.com/vivek-sam/CropNet.git)

Extra plugins needed for build ...
ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic/storage

ionic cordova plugin add cordova-plugin-request-location-accuracy
npm install --save @ionic-native/location-accuracy

Building Release apk : ionic cordova build --release android (https://ionicframework.com/docs/v1/guide/publishing.html)

ionic cordova plugin rm cordova-plugin-console
ionic cordova build --release android
keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
Keystorepass - urbanpass
keytool -importkeystore -srckeystore my-release-key.keystore -destkeystore my-release-key.keystore -deststoretype pkcs12
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name
H:\Development\Android\build-tools\27.0.3\zipalign -v 4 app-release-unsigned.apk UrbanApp22May.release.apk

