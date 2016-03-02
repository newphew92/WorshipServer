'use strict';

//add dependencies
var express= require('express');
var bodyParser= require('body-parser')
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/1234');

var app=express();
app.use(cors());
// app.use(express.static('/Client'));
app.use(bodyParser);



app.use(function(err, req, res, next) {
  res.status(500).send('Something broke');
});
var router = express.Router();


app.listen(8080, function () {console.log('App listening');});
