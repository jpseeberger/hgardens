var http = require('http');
var express = require('express');
var swig = require('swig');
var util = require('util');
var fs = require('fs');
var path = require('path');
var session = require('client-sessions');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var data = require('./data/users.json');


// Configure our HTTP server 
var app = express();

// Setup Swig as the Template Engine
app.engine('swig', swig.renderFile);
app.set('views', './app/views');
app.set('view engine', 'swig');

/*
var tpl = swig.compileFile('app/views/home.swig');
var tplLogin = swig.compileFile('app/views/login.swig');
var tplPassword = swig.compileFile('app/views/password.swig');
var tplInventory = swig.compileFile('app/views/inventory_update.swig');
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Use this before setting any routes
app.use(session({
    cookieName: 'userSession', 
    secret: 'secretpiratekeyforcrypto', 
    duration: 60 * 60 * 1000
}));

app.get('/', function (req, res) {
    res.render('home', {});
});

app.get('/login', function (req, res) {
    res.render('login', {});
});

app.post('/login', function (req, res) {
     fs.readFile('./data/users.json', 'utf-8', function(err, data) {
        data = JSON.parse(data);
    });    
   if(req.body.email==data.admin.email && req.body.password==data.admin.password)
    {
      req.userSession.loggedIn = true;
      res.redirect('/inventory');
    } else 
      res.redirect('/login');
});

app.get('/inventory', function (req, res) {
    res.render('inventory_update', { title: "Update Inventory" });
});

app.get('/inventory/new', function (req, res) {
    var body = "This would show form for creating a new Inventory item<br /><form method=post action=/inventory>Price: <input type=text name=price /><br /><input type=submit /></form>";
    res.send(body);
});

app.post('/inventory', function (req, res) {
    console.log('I would create an inventory item here with params ' + JSON.stringify(req.body));
    
    // append req.body to the file and save it
    
    res.redirect('/inventory');
});

app.get('/inventory/:id', function (req, res) {
    var body = "This would show a form for udpating Inventory #" + req.params.id + "<br /><form method=post action=/inventory/" + req.params.id + "><input type=submit /></form>";
    res.send(body);
});

app.post('/inventory/:id', function (req, res) {
    console.log('I would update inventory item #' + req.params.id);
    res.redirect('/inventory');
});

app.get('/inventory/:id/delete', function (req, res) {
    var body = "This would show a form to confirm deletion of Inventory #" + req.params.id + "<br /><form method=post action=/inventory/" + req.params.id + "/delete><input type=submit /></form>";
    res.send(body);
});

app.post('/inventory/:id/delete', function (req, res) {
    console.log('I would delete inventory item #' + req.params.id);
    res.redirect('/inventory');
});




// Setup static file serving
app.use(express.static('public'));
// Set up path to data directory holding json file.
app.use("/data", express.static(__dirname + '/data'));

// Listen on port 3000, IP defaults to 127.0.0.1
server = app.listen(3000);

// Put a friendly message on the terminal
console.log("Express Server, with static files middleware running at http://127.0.0.1:3000/");