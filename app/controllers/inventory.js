var express = require('express');

var swig = require('swig');
var fs = require('fs');
var path = require('path');
var db = require('../../db');

/*Object sorting function from stackoverflow
  Usage:
  objSort(object, 'key') --> sort by key (ascending, case in-sensitive)
  objSort(object, 'key', true) --> sort by key (ascending, case sensitive)
  objSort(object, ['key', true]) --> sort by key (descending, case in-sensitive)
  objSort(object, 'key1', 'key2') --> sort by key1 then key2 (both ascending, case in-sensitive)
  objSort(object, 'key1', ['price', true]) --> sort by key1 (ascending) then key2 (descending), case in-sensitive)
*/
function objSort() {
  var args = arguments,
    array = args[0],
    case_sensitive, keys_length, key, desc, a, b, i;

  if (typeof arguments[arguments.length - 1] === 'boolean') {
    case_sensitive = arguments[arguments.length - 1];
    keys_length = arguments.length - 1;
  } else {
    case_sensitive = false;
    keys_length = arguments.length;
  }

  return array.sort(function (obj1, obj2) {
    for (i = 1; i < keys_length; i++) {
      key = args[i];
      if (typeof key !== 'string') {
        desc = key[1];
        key = key[0];
        a = obj1[args[i][0]];
        b = obj2[args[i][0]];
      } else {
        desc = false;
        a = obj1[args[i]];
        b = obj2[args[i]];
      }
      if (case_sensitive === false && typeof a === 'string') {
        a = a.toLowerCase();
        b = b.toLowerCase();
      }
      if (! desc) {
        if (a < b) return -1;
        if (a > b) return 1;
      } else {
        if (a > b) return -1;
        if (a < b) return 1;
      }
    }
    return 0;
  });
} //end of objSort() function



module.exports = function (app) {
  // For now, while data stored in json file, read inventory data into memory.
  var inventory_data = {};
  var classification_data = [];
  
  fs.readFile('./data/inventory_sm5.json', 'utf-8', function(err, data) {
    if(!err)
    { 
      inventory_data = JSON.parse(data);
          
      // Make array of classification_data types for menu.
      // Sort the inventory_data object by classification, etc.
      // and get the count in each classification
        for (var i = 0; i < inventory_data.inventory.length ; i++) {
            objSort(inventory_data.inventory, 'classification', 'category', 'subcategory'); 
        }
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
    

  app.get('/', function (req, res) {

    var classifications_top_level = [];

    //Make array of top level of classifications table.
    var sql = "SELECT * ";
      sql += "FROM classifications ";
      sql += "WHERE parent_id IS NULL ";
      sql += "ORDER BY name ";

      // Why am I doing db.all instead of db.run?  db.run doesn't return data so 
      // only use to insert data.  db.all returns data from the database.
	  db.all(sql, function(err, rows){
	    if (!err){
          for (i = 0; i < rows.length; i++)
          {
            classifications_top_level[i] = rows[i].name;
          }
        }
//        console.log('classifications_top_level: ', classifications_top_level);

        res.render('home', {title: "Harvest Lane Gardens", inventory: inventory_data.inventory, classifications: classifications_top_level});
  	   });
  });

    
    
  // Changed this app.all back to app.get. 
  app.get('/inventory', function (req, res) {
    if (req.userSession.loggedIn)
    {
        var inventory_data_lowest_level = [{}];

        var sql = "SELECT name AS subcategory, price, unit, unitsavailable, grower, photo ";
        sql += "FROM classifications, items ";
        sql += "WHERE classification_id=classifications.id";

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
      console.log('req.params55', req.params);
      var currentItem = inventory_data.inventory.splice((req.params.id).substring(1,2), 1);
      
      res.render('inventory_edit', { title: "Edit Inventory Item", inventory: inventory_data.inventory, currentItem: currentItem });
  });

  app.post('/inventory/:id', function (req, res) {
    res.redirect('/inventory');
  });

  app.get('/inventory/:id/delete', function (req, res) {
      var currentItem = inventory_data.inventory.splice((req.params.id).substring(1,2), 1);
      
      res.render('inventory_delete', { title: "Delete Inventory Item", inventory: inventory_data.inventory, currentItem: currentItem });
  });

  app.post('/inventory/:id/delete', function (req, res) {
//    console.log('I would delete inventory item #' + req.params.id);

    inventory_data.inventory.splice((req.params.id).substring(1,2), 1);
      
    res.redirect('/inventory');
  });



};

