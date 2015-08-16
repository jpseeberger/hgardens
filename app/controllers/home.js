var express = require('express');

var swig = require('swig');
var fs = require('fs');
var path = require('path');
var db = require('../../db');


module.exports = function (app) {
classification_data = [];
  app.inventory_data = {};

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
    //Make array of top level of classifications table.
    var sql = "SELECT * FROM classifications ";
      sql += "WHERE parent_id IS NULL ORDER BY name ";

    // Why am I doing db.all instead of db.run?  db.run doesn't return data so 
    // only use to insert data.  db.all returns data from the database.
    db.all(sql, function(err, rows){
      var classes = [];
      if (!err){
console.log("rows: ", rows);
        for (i = 0; i < rows.length; i++)
        {
          classes[i] = rows[i].name;
        }
console.log("classes: ", classes);
      // Show our homepage
      res.render('home', {
        title: "Harvest Lane Gardens", 
        inventory: inventory_data.inventory, 
        classifications: classes
      });
      }
    });
  });
};
