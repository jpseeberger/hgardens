var http = require('http');
var express = require('express');
var path = require('path');

var data = require('./data/users.json');

// Configure our HTTP server 
var app = express();

require('./app/controllers/hlg')(app);

// Listen on port 3000, IP defaults to 127.0.0.1
server = app.listen(3000);

// Put a friendly message on the terminal
console.log("Express Server, with static files middleware running at http://127.0.0.1:3000/");