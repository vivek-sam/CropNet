var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
 /* var util = require('util'); */


// Configuration
 mongoose.connect('mongodb://localhost/cropsdb');

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
var Schema = mongoose.Schema;
var cropSchema = new Schema({
  CropName: String,
  FileName: String,
  FileId: String,
  FileType:String
});
var crops = mongoose.model('crops', cropSchema);
 function insertFileDetails(cname,fName,fId,fType){
   var newcrop = new crops({
            CropName:  cname ,
            FileName:  fName ,
            FileId:  fId,
            FileType: fType
          });
        newcrop.save(function(err, users){
            // if(err){ res.send(err); } else { res.json(users); }
        });
 };

var crop= mongoose.model('crop',cropSchema);

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
          }else{

            insertFileDetails(file.filename, file.filename, file._id, file.contentType );
            return res.status(200).send({
                message: 'Success',
                file: file
            });
          }


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
    app.get('/api/img', (req, res) => {
      gfs.files.find({
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

app.listen(8081);
console.log("App listening on port 8080");

});
