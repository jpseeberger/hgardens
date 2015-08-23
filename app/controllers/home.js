var express = require('express');

var swig = require('swig');
var fs = require('fs');
var path = require('path');
var db = require('../../db');

var classification_data = [];
var classes = [];
var items = [];
var topLevelClasses = [];


/*
// Async type processing:
function getClasses(callback)
{
  // Do stuff
  callback(classes);
}

function getItems(callback)
{
  // Do stuff
  callback(items);
}

// Old procedural style (doesnt work in node!! / async)
//var classes=getClasses();
//var items = getItems();
//res.render();
*/

// Build classifications table



function getItems(callback)
{
      var sqlItems = "SELECT classifications.name, * FROM items, classifications ";
        sqlItems += "WHERE classification_id=classifications.id AND unitsavailable != 0 ";
//        sqlItems += "ORDER BY items.classification_id";
      db.all(sqlItems, function(err, rows) {
        if (!err)
        {
          items = rows;
//          console.log("items: ", items);

          // BE SURE TO DO THIS INSIDE OF A db.all() CALLBACK
          callback(items);
        }
        else 
        {
          // on error, send nothing
          // res.json("err": err);
          console.log('err: ', err);
        }
      });
}

function getClasses(callback) 
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

  var sqlClassifications = "SELECT * FROM classifications ORDER BY name";
  db.all(sqlClassifications, function(err, rows) {
    if (!err)
    {
      classes = rows;
      console.log("classes: ", classes);
      
          // BE SURE TO DO THIS INSIDE OF A db.all() CALLBACK
          callback(classes);
    }
    else 
    {
      // on error, send nothing
      // res.json("err": err);
      console.log('err: ', err);
    }
  });

} 


module.exports = function (app) {
  app.get('/', function (req, res) {

    
    getClasses(function(classes) {
      getItems(function(items) {
        res.render('home', {
          title: "Harvest Lane Gardens", 
          inventory: items, 
          classifications: topLevelClasses
        });
      });
    });
  });
};

