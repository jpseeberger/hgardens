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


  obj = { one: 'hi', two: 'bye' };
  arr =   [ { classification: 'vegetable',
       category: 'spinach',
       subcategory: 'none',
       price: '1.50',
       unit: 'bundle',
       unitsavailable: '20',
       grower: 'roxane',
       photo: 'n' },
     { classification: 'herb',
       category: 'dill',
       subcategory: 'none',
       price: '1.00',
       unit: 'bundle',
       unitsavailable: '20',
       grower: 'roxane',
       photo: 'n' },
     { classification: 'herb',
       category: 'parsley',
       subcategory: 'none',
       price: '1.00',
       unit: 'bundle',
       unitsavailable: '5',
       grower: 'loren',
       photo: 'n' },
     { classification: 'specialty',
       category: 'purselane',
       subcategory: 'none',
       price: '1.50',
       unit: 'bundle',
       unitsavailable: '5',
       grower: 'roxane',
       photo: 'n' },
     { classification: 'fruits',
       category: 'strawberry',
       subcategory: 'none',
       price: '3.00',
       unit: 'pint',
       unitsavailable: '3',
       grower: 'loren',
       photo: 'n' },
     { classification: 'vegetable',
       category: 'radish',
       subcategory: 'french breakfast',
       price: '2.50',
       unit: 'bundle',
       unitsavailable: '5',
       grower: 'roxane',
       photo: 'n' },
     { classification: 'vegetable',
       category: 'tomato',
       subcategory: 'heirloom zebra',
       price: '1.50',
       unit: '3 count',
       unitsavailable: '5',
       grower: 'jon',
       photo: 'n' },
     { classification: 'onion',
       category: 'onion',
       subcategory: 'walla walla',
       price: '4.00',
       unit: '5 count',
       unitsavailable: '5',
       grower: 'roxane',
       photo: 'n' },
     { classification: 'vegetable',
       category: 'peppers',
       subcategory: 'jalapeno (hot)',
       price: '3.00',
       unit: 'pint',
       unitsavailable: '5',
       grower: 'roxane',
       photo: 'n' } ];
  


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
var inventory_data;
fs.readFile('./data/inventory_sm5.json', 'utf-8', function(err, inventory_data) {
  if (err) throw err;
  inventory_data = JSON.parse(inventory_data);
    console.log('inventory_data 2: ', inventory_data);
    console.log('inventory_data 3: ', inventory_data.inventory[5].category);
/*  $('inventory_data').each( inventory_data, function( ob, el ) {
      // Sort the elements by classification, etc. 
      for (var i = 0; i < el.length ; i++) {
        objSort(el, 'classification', 'category', 'subcategory'); 
      }
    });
*/
});    
    
// Changed this app.get to app.all.  Is this correct?
app.all('/inventory', function (req, res) {
    if (req.userSession.loggedIn)
      res.render('inventory', { title: "Inventory" });
    else
      res.redirect('/login');

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


 };

