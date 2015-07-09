var http = require('http');
var express = require('express');
var swig = require('swig');

var app = express();


var tpl = swig.compileFile('views/home.swig');
var tplLogin = swig.compileFile('views/login.swig');
var tplPassword = swig.compileFile('views/password.swig');

app.get('/', function (req, res) {
    res.send(tpl());
});

app.get('/login', function (req, res) {
    res.send(tplLogin());
});

app.get('/login/password', function (req, res) {
    res.send(tplPassword());
});
// Setup static file serving
app.use(express.static('public'));

// Listen on port 8000, IP defaults to 127.0.0.1
server = app.listen(3000);

// Put a friendly message on the terminal
console.log("Express Server, with static files middleware running at http://127.0.0.1:3000/");