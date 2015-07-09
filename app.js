var http = require('http');
var express = require('express'),
  router = express.Router();
var swig = require('swig');
var bodyParser = require('body-parser');

var app = express();



var tpl = swig.compileFile('app/views/home.swig');
var tplLogin = swig.compileFile('app/views/login.swig');
var tplPassword = swig.compileFile('app/views/password.swig');


app.get('/', function (req, res) {
    res.send(tpl());
});

app.get('/login', function (req, res) {
    res.send(tplLogin());
});

app.get('/login/password', function (req, res) {
    res.send(tplPassword({ title: "Request New Password", fullName: req.params['newlp'] }));
});


//router.get('/login/password', function (req, res) {
//    res.send(tplPassword({ title: "Request New Password", fullName: req.params['newlp'] }));
//});


//modules.exports = function(req,res) {
//    res.send
//}

// Use the Body parser for POST data
//app.use(bodyParser.urlencoded({ extended: true }));

//app.post('/login/password', function(req, res) {
//  res.send(tplPassword({ title: "Password request", fullName: req.body.newlp }));
//});

// Setup static file serving
app.use(express.static('public'));

// Listen on port 8000, IP defaults to 127.0.0.1
server = app.listen(3000);

// Put a friendly message on the terminal
console.log("Express Server, with static files middleware running at http://127.0.0.1:3000/");