var http = require('http');
var express = require('express');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('client-sessions');

var swig = require('swig');
var fs = require('fs');
var path = require('path');


// Configure our HTTP server 
var app = express();

//var db = require('./db');

// Setup Swig as the Template Engine
app.engine('swig', swig.renderFile);
app.set('views', './app/views');
app.set('view engine', 'swig');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Use this before setting any routes
app.use(session({
  cookieName: 'userSession', 
  secret: 'secretpiratekeyforcrypto', 
  duration: 60 * 60 * 1000
}));


require('./app/controllers/home')(app);
//require('./app/controllers/admin')(app);


// Setup static file serving
app.use(express.static('public'));
// Set up path to data directory holding json file.
app.use("/data", express.static(__dirname + '/data'));

// Listen on port 3000, IP defaults to 127.0.0.1
server = app.listen(3000);

// Put a friendly message on the terminal
console.log("Express Server, with static files middleware running at http://127.0.0.1:3000/");