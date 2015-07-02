var http = require('http');
var express = require('express');
var app = express();

// Setup static file serving
app.use(express.static('public'));

// Listen on port 8000, IP defaults to 127.0.0.1
server = app.listen(3000);

// Put a friendly message on the terminal
console.log("Express Server, with static files middleware running at http://127.0.0.1:3000/");