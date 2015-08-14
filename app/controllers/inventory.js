var express = require('express');

var swig = require('swig');
var fs = require('fs');
var path = require('path');
var db = require('../../db');

module.exports = function (app) {
  // For now, while data stored in json file, read inventory data into memory.
  app.inventory_data = {};
  //Create the classes array of objects
  fs.readFile('./data/inventory_sm5.json', 'utf-8', function(err, data) {
    if(!err)
    { 
      inventory_data = JSON.parse(data);
      // Make array of classification_data types for menu.
      for (var i = 0; i < inventory_data.inventory.length ; i++) {
        var j;
        if (i == 0) {
          j = 0;
          classification_data[0] = inventory_data.inventory[0].classification;
          j++;
        } else if (inventory_data.inventory[i].classification != inventory_data.inventory[i-1].classification)
        {
          classification_data[j] = inventory_data.inventory[i].classification;
          j++;
        }
      }

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
    {
        var sql = "SELECT items.id, name AS subcategory, price, unit, ";
        sql += "unitsavailable, grower, available_next_week, photo  ";
        sql += "FROM classifications, items ";
        sql += "WHERE classification_id=classifications.id ORDER BY name";

      // Why am I doing db.all instead of db.run?  db.run doesn't return data so 
      // only use to insert data.  db.all returns data from the database.
	  db.all(sql, function(err, rows){
	    if (!err){
          res.render('inventory', { title: "Inventory", inventory: rows });
        } else 
        {
          // on error, send nothing
//          res.json("err": err);
          console.log('err: ', err);
        }
      });
    }
    else
      res.redirect('/login');

  });

  app.get('/inventory/new', function (req, res) {
      res.render('inventory_new', { title: "New Inventory Item", inventory: inventory_data.inventory });
  });

  app.post('/inventory', function (req, res) {
    console.log('I would create an inventory item here with params ' + JSON.stringify(req.body));
    
    // append req.body to the file and save it
    inventory_data.inventory.push(req.body);
//db.run("INSERT INTO growers (first_name) VALUES (" + req.query.username + ");");   
    res.redirect('/inventory');
  });

  app.get('/inventory/:id', function (req, res) {
    // TEMP: all classifications
    var classes = [
      {id:1, name:'Fruit'},
      {id:2, name:'Veggie'},
      {id:8, name:'Spinach'}
    ];
    
    // Get all the item information
    var sql = "SELECT * FROM items ";
      sql  += "WHERE id=" + req.params.id;
    console.log('sql: ', sql);
    db.get(sql, function(err, row) {
      if (!err)
      {
        console.log('rows: ', row);
        res.render('inventory_edit', { title: "Edit Inventory Item", classes: classes, item: row });
      }
      else 
      {
        // on error, send nothing
//          res.json("err": err);
        console.log('err: ', err);
      }
    });
  });

  app.post('/inventory/:id', function (req, res) {
    console.log('I will edit an item with id of ' + req.params.id + ', values: ');
    console.log(req.body);
    res.redirect('/inventory');
  });

  app.get('/inventory/:id/delete', function (req, res) {
      
      res.render('inventory_delete', { title: "Delete Inventory Item"});
  });

  app.post('/inventory/:id/delete', function (req, res) {
//    console.log('I would delete inventory item #' + req.params.id);

    inventory_data.inventory.splice((req.params.id));
      
    res.redirect('/inventory');
  });



};

