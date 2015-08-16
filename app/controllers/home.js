var express = require('express');

var swig = require('swig');
var fs = require('fs');
var path = require('path');
var db = require('../../db');


module.exports = function (app) {

  app.get('/', function (req, res) {
    //Make array of top level of classifications table.
    var sql = "SELECT * FROM classifications ";
      sql += "WHERE parent_id IS NULL ORDER BY name ";

    // Why am I doing db.all instead of db.run?  db.run doesn't return data so 
    // only use to insert data.  db.all returns data from the database.
    db.all(sql, function(err, rows){
      var classes = [];
      if (!err){
        for (i = 0; i < rows.length; i++)
        {
          classes[i] = rows[i].name;
        }
      }
console.log("home: ", inventory_data.inventory);
      // Show our homepage
      res.render('home', {
        title: "Harvest Lane Gardens", 
        inventory: inventory_data.inventory, 
        classifications: classes
      });
    });
  });
};
