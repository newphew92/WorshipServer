'use strict';

//add dependencies
var express= require('express');
var bodyParser= require('body-parser')
var mongoose = require('mongoose');
var http = require('http');
mongoose.connect('mongodb://localhost:27017/Worship');
var Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
//mongod
//mongo
// show dbs
// use db
// show collections
// var Schema = mongoose.Schema;
// var state = new Schema({
//   spawnX: double,
//   spawnY: double,
//   spawnZ: double,
//
// })
// db.gameStates.find().skip(db.collection.count()-1)
var GameSchema = new Schema({
  spawnX: Number,
  spawnY: Number,
  spawnZ: Number,
  enemies: Number
});
var GameStates = mongoose.model('gameStates', GameSchema);

var app=express();
var PORT = 8080;

function handleRequest(request, response){
  if(request.method === "POST") {
    if (request.url === "/loadWorld") {
      console.log("Sending world data");
      response.writeHead(200,{"Content-Type": "application/JSON"})
      var otherArray = ["item1", "item2"];
      var otherObject = { item1: "item1val", item2: "item2val" };
      var json = JSON.stringify({
        anObject: otherObject,
        anArray: otherArray,
        another: "item"
      });
      response.end(json);
    }
    else if (request.url === "/saveWorld"){
      console.log("Save world data");
      response.writeHead(200,{"Content-Type": "text/plain"})
      // response.setEncoding('utf8');
      request.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
        var state = new GameStates(chunk);
        state.collection.insert(chunk);
      });
      response.end('I think I managed to save' )

    }
  }
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});



// app.use(express.static('/Client'));
// app.use(bodyParser);
//
//
//
// app.use(function(err, req, res, next) {
//   res.status(500).send('Something broke');
// });
// var router = express.Router();
//
// app.post('/test', function(req, res, next) {
// var body = JSON.parse(req.body.data);
// //   var queryNum = parseInt(body.num);
// var data = body.data;
// console.log(data)
// console.log("HOOGA")
// //   // get(queryNum, data, function(err, data) {
// //   //   if (err) {
// //   //     return next(err);
// //   //   }
// //     data='successful'
// //     res.send(data);
// //     next();
//   });
//
//
//
// app.listen(8080, function () {console.log('App listening');});
