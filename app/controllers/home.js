var express = require('express');

var swig = require('swig');
var util = require('util');
var fs = require('fs');
var path = require('path');
var session = require('client-sessions');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var data = require('../../data/users.json');
var inventory_data = require('../../data/inventory_sm5.json');


// Configure our HTTP server 
var app = express();



module.exports = function (app) {
  // Setup Swig as the Template Engine
  app.engine('swig', swig.renderFile);
  app.set('views', './app/views');
  app.set('view engine', 'swig');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Setup static file serving
  app.use(express.static('public'));
  // Set up path to data directory holding json file.
  app.use("/data", express.static(__dirname + '/data'));

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

  // For now, while data stored in json file, read inventory data into memory.
  var inventory_data = {};
    
  fs.readFile('./data/inventory_sm5.json', 'utf-8', function(err, data) {
  if (err) throw err;
  inventory_data = JSON.parse(data);
      
//    console.log('inventory_data 2: ', inventory_data);
//    console.log('inventory_data 3: ', inventory_data.inventory[5].category);

      /*  $('inventory_data').each( inventory_data, function( ob, el ) {
      // Sort the elements by classification, etc. 
      for (var i = 0; i < el.length ; i++) {
        objSort(el, 'classification', 'category', 'subcategory'); 
      }
    });
*/
  arr = inventory_data.inventory;
 //       console.log('arr 2: ', arr[2]);

  // Set the capitalization  
/*  for (var i = 0; i < arr.length ; i++) {
      capitalize(arr[i].classification, true)
      capitalize(arr[i].category, true)
      capitalize(arr[i].subcategory, true)
      capitalize(arr[i].grower, true)
    console.log('arr 4: ', i, ': ', arr[i].classification);
  }
*/      
  });    
    
  // Changed this app.all back to app.get. 
  app.get('/inventory', function (req, res) {
    if (req.userSession.loggedIn)
      res.render('inventory', { title: "Inventory" });
    else
      res.redirect('/login');

  });

  app.get('/inventory/new', function (req, res) {
      res.render('inventory_new', { title: "New Inventory Item" });
//    var body = "This would show form for creating a new Inventory item<br /><form method=post action=/inventory>Price: <input type=text name=price /><br /><input type=submit /></form>";
//    res.send(body);
  });

  app.post('/inventory', function (req, res) {
    console.log('I would create an inventory item here with params ' + JSON.stringify(req.body));
    console.log('req.body: ' , req.body);
    
    // append req.body to the file and save it
    arr.push(req.body);
    
    res.redirect('/inventory');
  });

  app.get('/inventory/:id', function (req, res) {
    var body = "This would show a form for udpating Inventory #" + req.params.id + "<br /><form method=post action=/inventory/" + req.params.id + "><input type=submit /></form>";
      res.render('inventory_edit', { title: "Edit Inventory Item" });
//    res.send(body);
  });

  app.post('/inventory/:id', function (req, res) {
    console.log('I would update inventory item #' + req.params.id);
    res.redirect('/inventory');
  });

  app.get('/inventory/:id/delete', function (req, res) {
//    var body = "Are you sure you want to delete inventory #" + req.params.id + "?<br /><form method=post action=/inventory/" + req.params.id + "/delete><input type=submit /></form>";
    var body = "Are you sure you want to delete " + (req.params.id).substring(1,2) + "?<br /><form method=post action=/inventory/" + req.params.id + "/delete><input type=submit /></form>";
    res.send(body);
  });

  app.post('/inventory/:id/delete', function (req, res) {
    console.log('I would delete inventory item #' + req.params.id);

    arr.splice((req.params.id).substring(1,2), 1);
      
    res.redirect('/inventory');
  });

};

