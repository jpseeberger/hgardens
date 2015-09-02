var express = require('express');

var swig = require('swig');
var fs = require('fs');
var path = require('path');

var db = {};
var classes = [];
var items = [];
var leaves = [];
var topLevelClasses = [];
var topLevelClassesArray = [];


function getItems(callback)
{
  var sqlItems = "SELECT classifications.name, * FROM items, classifications ";
    sqlItems += "WHERE classification_id=classifications.id AND unitsavailable != 0 ";
//        sqlItems += "ORDER BY items.classification_id";
  db.all(sqlItems, function(err, rows) {
    if (!err)
    {
      items = rows;

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
  var sqlClassifications = "SELECT * FROM classifications ORDER BY name";
  db.all(sqlClassifications, function(err, rows) {
    if (!err)
    {
      classes = rows;
      console.log("classes: ", classes);
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

function getTopLevelClasses(callback) 
{
  var sqlTopLevel = "SELECT * FROM classifications ";
    sqlTopLevel  += "WHERE parent_id IS NULL ORDER BY name";
  db.all(sqlTopLevel, function(err, rows) {
    if (!err)
    {
      topLevelClasses = rows;
      for (i = 0; i < rows.length; i++)
      {
        topLevelClassesArray[i] = rows[i].id;
      }
      console.log("topLevelClasses: ", topLevelClasses);
      
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

function groupLeavesByTopLevel(callback) 
{
  // Select all classifications where the id is also a classification_id in items.
  // This gives the lowest level classifications
//  var sqlLeaves = "SELECT DISTINCT classifications.* FROM classifications, items ";
//    sqlLeaves  += "WHERE classifications.id IN (SELECT items.classification_id FROM items) ";
  var sqlLeaves = "SELECT classifications.*, items.* FROM classifications, items ";
    sqlLeaves  += "WHERE ((classifications.id IN (SELECT items.classification_id FROM items)) ";
    sqlLeaves  += "AND (classifications.id = items.classification_id)) ";
    sqlLeaves  += "ORDER BY classifications.id";
  db.all(sqlLeaves, function(err, rows) {
    var topParentFound = 0;
    if (!err)
    {
      leaves = rows;
      // Find the top level that each leaf belongs to
      for (var j = 0; j < leaves.length; j++)
      {
        topParentFound = 0;
        while (!topParentFound)
        {
          if(topLevelClassesArray.indexOf(leaves[j].parent_id) > -1)
          {
            topParentFound = 1;
          }
          else
          {
            for (var k = 0; k < classes.length; k++)
            {
              if(leaves[j].parent_id == classes[k].id)
              {
                leaves[j].parent_id = classes[k].parent_id;
                break;
              }
            }
          }
        }
      }
//      console.log("leaves: ", leaves);

      callback(leaves);
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
  // Allow for functions above to access our database connection
  db = app.locals.db;

  app.get('/', function (req, res) {
    
    getClasses(function(classes) {
      getTopLevelClasses(function(classes) {
        getItems(function(items) {
          groupLeavesByTopLevel(function(leaves) {
            res.render('home', {
              title: "Harvest Lane Gardens", 
              inventory: leaves, 
              classifications: classes,
              parentClasses: topLevelClasses
            });
          });
        });
      });
    });
  });
};

