var express = require('express');

var swig = require('swig');
var fs = require('fs');
var path = require('path');
var db = require('../../db');

module.exports = function (app) {
  // For now, while data stored in json file, read inventory data into memory.
  var inventory_data = {};
    
  fs.readFile('./data/inventory_sm5.json', 'utf-8', function(err, data) {
    if(!err)
      { 
       inventory_data = JSON.parse(data);
       //    res.json(data);
      } 
      else 
      {
        // on error, send nothing
        //    res.json("err": err);
      }
  });    
    
  // Changed this app.all back to app.get. 
  app.get('/inventory', function (req, res) {
    if (req.userSession.loggedIn)
      res.render('inventory', { title: "Inventory", inventory: inventory_data.inventory });
    else
      res.redirect('/login');

  });

  app.get('/inventory/new', function (req, res) {
      res.render('inventory_new', { title: "New Inventory Item" });
  });

  app.post('/inventory', function (req, res) {
    console.log('I would create an inventory item here with params ' + JSON.stringify(req.body));
    console.log('req.body: ' , req.body);
    
    // append req.body to the file and save it
    arr.push(req.body);
    
    res.redirect('/inventory');
  });

  app.get('/inventory/:id', function (req, res) {
 //   var body = "This would show a form for udpating Inventory #" + req.params.id + "<br /><form method=post action=/inventory/" + req.params.id + "><input type=submit /></form>";
      console.log('req.params55', req.params);
//      var itemNumber = (req.params.id).substring(1,2);
      var currentArr = arr.splice((req.params.id).substring(1,2), 1);
      
      res.render('inventory_edit', { title: "Edit Inventory Item", arrayItem: currentArr });
//    res.send(body);
  });

  app.post('/inventory/:id', function (req, res) {
//    console.log('I would update inventory item #' + req.params.id);
    res.redirect('/inventory');
  });

  app.get('/inventory/:id/delete', function (req, res) {
//    var body = "Are you sure you want to delete inventory #" + req.params.id + "?<br /><form method=post action=/inventory/" + req.params.id + "/delete><input type=submit /></form>";
    var body = "Are you sure you want to delete " + (req.params.id).substring(1,2) + "?<br /><form method=post action=/inventory/" + req.params.id + "/delete><input type=submit /></form>";
    res.send(body);
  });

  app.post('/inventory/:id/delete', function (req, res) {
//    console.log('I would delete inventory item #' + req.params.id);

    arr.splice((req.params.id).substring(1,2), 1);
      
    res.redirect('/inventory');
  });

};

