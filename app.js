var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('client-sessions');
var fs = require('fs');
var path = require('path');
var swig = require('swig');

// Get our runtime config
var config = require('./config');

// Configure our HTTP server 
var app = express();
app.locals.config = config;

// Add in our DB for all controllers to access
require('./db')(app);

// Setup Swig as the Template Engine
app.engine('swig', swig.renderFile);
app.set('views', './app/views');
app.set('view engine', 'swig');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Use this before setting any routes
app.use(session({
  cookieName: 'userSession', 
  secret: 'secretpiratekeyforcrypto', 
  duration: 60 * 60 * 1000
}));

require('./app/controllers/home')(app);
require('./app/controllers/admin')(app);
require('./app/controllers/inventory')(app);
require('./app/controllers/classifications')(app);
require('./app/controllers/manage_photos')(app);

// Setup static file serving
app.use(express.static('public'));

// Listen on port 3000, IP defaults to 127.0.0.1
server = app.listen(config.port, config.ip);

// Put a friendly message on the terminal
console.log(config.name + ' started [ip:' + config.ip + ', port:' + config.port +
    ', data_dir: "' + config.data_dir + '"]');
