var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

// Configuration
 mongoose.connect('mongodb://localhost/urbanfarm');

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());

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
  Location:String,
  PhoneNumber:String,
  Connections:String
});
var cropselectSchema = new Schema({
  CropType1: String
});
var user= mongoose.model('user',userSchema);
var basicinfo = mongoose.model('basicinfo', basicinfoSchema);
var cropselect= mongoose.model('cropselect', cropselectSchema);
//module.exports = user;

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
        Languages:req.body.language,
        ImageUrl :req.body.imageUrl,
        Location: JSON.stringify(req.body.location),
        PhoneNumber:req.body.phoneNumber,
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
      var info = new basicinfo({
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


//     db.insert.insert({
//    NickName: 'MongoDB Overview',
//    Location: 'location point',
//    ImageUrl: 'http://www.tutorialspoint.com',
//    Languages: ['mongodb', 'database', 'NoSQL']
// })
// db.tutorialspoint.insert({"name" : "tutorialspoint"})

    // app.post('/api/rooms/reserve', function(req, res) {
    //
    //     console.log(req.body._id);
    //
    //     Room.findByIdAndUpdate(req.body._id, {
    //         $push: {"reserved": {from: req.body.from, to: req.body.to}}
    //     }, {
    //         safe: true,
    //         new: true
    //     }, function(err, room){
    //         if(err){
    //             res.send(err);
    //         } else {
    //             res.json(room);
    //         }
    //     });
    //
    // });

// listen
app.listen(8080);
console.log("App listening on port 8080");
