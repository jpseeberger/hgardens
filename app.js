var http = require('http');
var express = require('express');
var swig = require('swig');
var util = require('util');
var fs = require('fs');
var path = require('path');
var session = require('client-sessions');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// Configure our HTTP server 
var app = express();



var tpl = swig.compileFile('app/views/home.swig');
var tplLogin = swig.compileFile('app/views/login.swig');
var tplPassword = swig.compileFile('app/views/password.swig');
var tplInventory = swig.compileFile('app/views/inventory_update.swig');

// Add client side middleware
app.use(session({cookieName: 'session', secret: 'longsecretkeyforcrypto', duration: 30 * 1000}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.get('/', function (req, res) {
    res.send(tpl());
});

app.get('/login', function (req, res) {
    res.send(tplLogin());
});

app.get('/login/password', function (req, res) {
    res.send(tplPassword({ title: "Request New Password", fullName: req.params['newlp'] }));
});

app.get('/inventory', function (req, res) {
    res.send(tplInventory({ title: "Update Inventory" }));
});


// Setup static file serving
app.use(express.static('public'));
// Set up path to data directory holding json file.
app.use("/data", express.static(__dirname + '/data'));

// Listen on port 3000, IP defaults to 127.0.0.1
server = app.listen(3000);

// Put a friendly message on the terminal
console.log("Express Server, with static files middleware running at http://127.0.0.1:3000/");