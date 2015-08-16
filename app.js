var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('client-sessions');
var fs = require('fs');
var path = require('path');
var swig = require('swig');

// Configure our HTTP server 
var app = express();

//var db = require('./db');

// Setup Swig as the Template Engine
app.engine('swig', swig.renderFile);
app.set('views', './app/views');
app.set('view engine', 'swig');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/*
app.use(function(req, res, next) {
  console.log('Hi!! You went to: ' + req.url);
  if (req.url == '/') next();
  else res.redirect('/');
});
*/

// Use this before setting any routes
app.use(session({
  cookieName: 'userSession', 
  secret: 'secretpiratekeyforcrypto', 
  duration: 60 * 60 * 1000
}));

require('./app/controllers/home')(app);
require('./app/controllers/admin')(app);
require('./app/controllers/inventory')(app);

// Setup static file serving
app.use(express.static('public'));

// Listen on port 3000, IP defaults to 127.0.0.1
server = app.listen(3000);

// Put a friendly message on the terminal
console.log("Express Server, with static files middleware running at http://127.0.0.1:3000/");