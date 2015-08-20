var express = require('express');

var swig = require('swig');
var fs = require('fs');
var path = require('path');
var db = require('../../db');


module.exports = function (app) {
  var classification_data = [];
  var classes = [];
  var leaf = [];
  var topLevelClasses = [];

  // Build classifications table
  function getClasses() 
//  function getClasses(callback(items, classes)) 
  {
    // Select all items where the parent_id is null.
    var sqlTopLevel = "SELECT * FROM classifications ";
      sqlTopLevel  += "WHERE parent_id IS NULL ORDER BY name";
    db.all(sqlTopLevel, function(err, rows) {
      if (!err)
      {
        for (i = 0; i < rows.length; i++)
        {
          topLevelClasses[i] = rows[i].name;
        }
        console.log("topLevelClasses: ", topLevelClasses);
      }
      else 
      {
        // on error, send nothing
        // res.json("err": err);
        console.log('err: ', err);
      }
    });
    
  } 
  

  //Create the classes array of objects
  fs.readFile('./data/inventory.json', 'utf-8', function(err, data) {
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

    

  app.get('/', function (req, res) {
    getClasses();
//    getClasses(function(items, classes) {
    
//      console.log('leaf: ', leaf);

      // Show our homepage
      res.render('home', {
        title: "Harvest Lane Gardens", 
//        inventory: items, 
        inventory: inventory_data.inventory, 
        classifications: topLevelClasses
      });
//    });
  });
};
