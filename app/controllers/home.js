var express = require('express');

var swig = require('swig');
var fs = require('fs');
var path = require('path');
var db = require('../../db');

var classification_data = [];
var classes = [];
var leaf = [];
var topLevelClasses = [];

/*
// Async type processing:
function getTopLevelClasses(callback)
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

  // Do stuff
  callback(classes);
}

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

  var sqlClassifications = "SELECT * FROM classifications";
  db.all(sqlClassifications, function(err, rows) {
    if (!err)
    {
      classes = rows;
      var sqlItems = "SELECT classifications.name, * FROM items, classifications ";
        sqlItems += "WHERE classification_id=classifications.id AND unitsavailable != 0 ";
//        sqlItems += "ORDER BY items.classification_id";
      db.all(sqlItems, function(err, rows) {
        if (!err)
        {
          items = rows;
          console.log("items: ", items);

          // BE SURE TO DO THIS INSIDE OF A db.all() CALLBACK
          callback(items, classes);
        }
        else 
        {
          // on error, send nothing
          // res.json("err": err);
          console.log('err: ', err);
        }
      });
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

/*    
    getClasses(function(classes) {
      getItems(function(items) {
      res.render('home', {
        title: "Harvest Lane Gardens", 
        inventory: items, 
        classifications: topLevelClasses
      });
      });
    });
*/
    
    getClasses(function(items, classes) {
      res.render('home', {
        title: "Harvest Lane Gardens", 
        inventory: items, 
        classifications: topLevelClasses
      });
    });
  });
};

