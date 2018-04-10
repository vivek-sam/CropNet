var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
 /* var util = require('util'); */
 
 
// Configuration
 mongoose.connect('mongodb://localhost/urbanfarm');

const fileUpload = require('express-fileupload'); 

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());
app.use(fileUpload());


 var fs = require('fs');
let Grid = require("gridfs-stream");
let conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
let gfs;

conn.once("open", () => {

    gfs = Grid(conn.db);
// Models
// var ObjectID = require('mongodb').ObjectID;
//
// var user = {
//   a: 'abc',
//   _id: new ObjectID()
// };
//
// conn.collection('aaa').insert(user);

//var users = mongoose.model('users',{});
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  Name: String,
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true }
});

var basicinfoSchema = new Schema({
  NickName: String,
  Languages:String,
  ImageUrl :String,
  Location:Array,
  PhoneNumber:String,
  Email:String,
  Connections:String
});
var cropselectSchema = new Schema({
  BasicinfoID : {type: String, unique: true },
  CropType1: String

});
var connectionSchema = new Schema({
  BasicinfoID : {type: String, unique: true },
  Connection: String

});
var user= mongoose.model('user',userSchema);
  // basicinfoSchema.index( { "Location": "2d" } );
var basicinfo = mongoose.model('basicinfo', basicinfoSchema);

// db.places.insert({
//   loc: {
//     type: "Point",
//     coordinates: [-73.88, 40.78]
//   },
//   name: "La Guardia Airport",
//   category: "Airport"
// })
// db.places.createIndex({
//   loc: "2dsphere"
// })
// db.places.find({
//   loc: {
//     $geoWithin: {
//       $center: [
//         [-74, 40.74], 10
//       ]
//     }
//   }
// })
// db.basicinfos.find({
//   loc: {
//     $geoWithin: {
//       $center: [
//         [-74, 40.74], 10
//       ]
//     }
//   }
// })

// db.basicinfos.createIndex({  Location : "2dsphere"})
// db.basicinfos.Location.createIndex({  Location : "2dsphere"})
//db.basicinfos.find({   Location: {     $geoWithin: {       $center: [         [-74, 40.74], 10000       ]     }   } }).pretty()
// var output = basicinfo.find({   Location: {     $geoWithin: {       $center: [         [-74, 40.74], 10000       ]     }   } });
// console.log(output);

var cropselect= mongoose.model('cropselect', cropselectSchema);
var connection= mongoose.model('connection', connectionSchema);
//module.exports = user;

app.post('/api/geoLocationFinder', function(req, res) {
     var  center = [req.body.location.lat , req.body.location.lng];

     basicinfo.find({
       Location: {
         $geoWithin: {
           $center: [
             [req.body.location.lat , req.body.location.lng ], req.body.distKm
           ]
         }
       }
     },
     function(err, users) {
       if (err) {
         res.send(err);
       } else {
         res.json(users);
       }
     });

 });

    app.post('/api/users', function(req, res) {
      console.log("working" + req.body.email);
        user.find({
            Email: req.body.email,
            Password: req.body.password
        }, function(err, users){
            if(err){
                res.send(err);
            } else {
                res.json(users);
            }
        });

    });

    app.post('/api/users/signup', function(req, res) {
      var chris = new user({
            Name:  req.body.name,
            Email:  req.body.email,
            Password:  req.body.password
          });
      console.log("signup" + req.body.email);
        chris.save(function(err, users){
            if(err){
                res.send(err);
            } else {
                res.json(users);
            }
        });

    });
    app.post('/api/users/basicInfo', function(req, res) {
      var info = new basicinfo({
        NickName: req.body.nickName,
        Languages: " ",  //req.body.language
        ImageUrl :req.body.imageUrl,
        Location: "",//req.body.location
        PhoneNumber:req.body.phoneNumber,
        Email:req.body.eamil,
        Connections:req.body.connections
          });
      // console.log("signup" + req.body.email);
        info.save(function(err, users){
            if(err){
                res.send(err);
            } else {
                res.json(users);
            }
        });

    });
    app.post('/api/users/cropSelect', function(req, res) {
      var info = new cropselect({
        BasicinfoID:req.body.basicInfoId,
        CropType1: req.body.cropType1
          });
      // console.log("signup" + req.body.email);
        info.save(function(err, users){
            if(err){
                res.send(err);
            } else {
                res.json(users);
            }
        });

    });
    app.post('/api/users/connections', function(req, res) {
      var info = new connection({
        BasicinfoID:req.body.basicInfoId,
        Connection: req.body.connection
          });
      // console.log("signup" + req.body.email);
        info.save(function(err, users){
            if(err){
                res.send(err);
            } else {
                res.json(users);
            }
        });

    });
    app.post('/api/users/connectionStatus', function(req, res) {
      // var info = new basicinfo();
      // console.log("signup" + req.body.email);
        basicinfo.update({"_id":req.body.basicInfoId}, {$set:{"Connections": req.body.status , }}, function(err, users){
            if(err){
                res.send(err);
            } else {
                res.json(users);
            }
        });

    });
    app.post('/api/users/locationUpdate', function(req, res) {
      // var info = new basicinfo();
      // console.log("signup" + req.body.email);

    var loc = {};
    loc.type = "Point";
    loc.coordinates = [req.body.location.lat ,req.body.location.lng] ;
    req.body.location
        basicinfo.update({"_id":req.body.basicInfoId}, {$set:{"Languages": req.body.language , "Location": [loc]}}, function(err, users){
            if(err){
                res.send(err);
            } else {
                res.json(users);
            }
        });

    });
    app.post('/api/users/all', function(req, res) {
      var info = new basicinfo();
      // console.log("signup" + req.body.email);
        basicinfo.find({}, function(err, users){
            if(err){
                res.send(err);
            } else {
                res.json(users);
                // console.log(JSON.stringify(users));
            }
        });

    });
	 app.post('/api/search', function(req, res) {
      console.log(req.body.name);
	  if(req.body.searchBy == 'name'){
		basicinfo.find({"NickName" :new RegExp(req.body.searchFor) }, function(err, users){
            if(err){
                res.send(err);
            } else {
                res.json(users);
                /* console.log(JSON.stringify(users)); */
            }
        });
	  }


    });
	
	    app.post('/api/img', function(req, res) {
      /* console.log(JSON.stringify(req.file)); */
          let part = req.files.file;

        let writeStream = gfs.createWriteStream({
            filename: 'img_' + part.name,
            mode: 'w',
            content_type: part.mimetype
        });

        writeStream.on('close', (file) => {
          // checking for file
          if(!file) {
            res.status(400).send('No file received');
          }
            return res.status(200).send({
                message: 'Success',
                file: file
            });
        });
        // using callbacks is important !
        // writeStream should end the operation once all data is written to the DB
        writeStream.write(part.data, () => {
          writeStream.end();
        });
    });
	    app.get('/api/img/:imgname', (req, res) => {
      let imgname = req.params.imgname;
        gfs.files.find({
            filename: imgname
        }).toArray((err, files) => {

            if (files.length === 0) {
                return res.status(404).send({
                    message: 'File not found'
                });
            }
            let data = [];
            let readstream = gfs.createReadStream({
                filename: files[0].filename
            });

            readstream.on('data', (chunk) => {
                data.push(chunk);
            });

            readstream.on('end', () => {
                data = Buffer.concat(data);
                let img = 'data:image/png;base64,' + Buffer(data).toString('base64');
                res.end(img);
            });

            readstream.on('error', (err) => {
              // if theres an error, respond with a status of 500
              // responds should be sent, otherwise the users will be kept waiting
              // until Connection Time out
                res.status(500).send(err);
                console.log('An error occurred!', err);
            });
        });
    });
	
app.listen(8080);
console.log("App listening on port 8080");

});
