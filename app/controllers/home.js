var express = require('express');

var swig = require('swig');
var fs = require('fs');
var path = require('path');

var db = {};
var classification_data = [];
var classes = [];
var items = [];
var leaves = [];
var topLevelClasses = [];
var groupedClasses = [];
var topLevelClassesArray = [];

function getNextWeek(callback) 
{
  var sqlItems = "SELECT classifications.name, * FROM items, classifications ";
    sqlItems += "WHERE items.classification_id=classifications.id AND items.available_next_week = 'y' ";
    sqlItems += "ORDER BY classifications.name";
  db.all(sqlItems, function(err, rows) {
    if (!err)
    {
      nextWeek = rows;
//      console.log("classes 2: ", classes);
//      console.log("nextWeek 2: ", nextWeek);

      callback(nextWeek);
    }
    else 
    {
      // on error, send nothing
      // res.json("err": err);
      console.log('err: ', err);
    }
  });
}

function getFullList(callback) 
{
  var sqlItems = "SELECT classifications.name, * FROM items, classifications ";
    sqlItems += "WHERE items.classification_id=classifications.id AND items.full_list = 'y' ";
    sqlItems += "ORDER BY classifications.name";
  db.all(sqlItems, function(err, rows) {
    if (!err)
    {
      fullList = rows;
//      console.log("fullList 2: ", fullList);

      callback(fullList);
    }
    else 
    {
      // on error, send nothing
      // res.json("err": err);
      console.log('err: ', err);
    }
  });
}

function getItems(callback)
{
  var sqlItems = "SELECT classifications.name, * FROM items, classifications ";
    sqlItems += "WHERE classification_id=classifications.id AND unitsavailable != 0 ";
//        sqlItems += "ORDER BY items.classification_id";
  db.all(sqlItems, function(err, rows) {
    if (!err)
    {
      items = rows;
//      console.log("items: ", items);
      console.log("groupedClasses: ", groupedClasses);

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

function groupByTopLevel(callback) 
{
  // Select all classifications where the id is also a classification_id in items.
  // This gives the lowest level classifications
  var sqlLeaves = "SELECT DISTINCT classifications.* FROM classifications, items ";
    sqlLeaves  += "WHERE classifications.id IN (SELECT items.classification_id FROM items )";
    sqlLeaves  += "ORDER BY classifications.id";
  db.all(sqlLeaves, function(err, rows) {
    var topParentFound = 0;
    if (!err)
    {
      leaves = rows;
      console.log("leaves: ", leaves);
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
      console.log("leaves: ", leaves);

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
          groupByTopLevel(function(leaves) {
            getNextWeek(function(nextWeek) {
              getFullList(function(fullList) {
                res.render('home', {
                  title: "Harvest Lane Gardens", 
                  inventory: items, 
                  nextWeek: nextWeek, 
                  fullList: fullList, 
                  classifications: classes,
                  leaves: leaves,
                  parentClasses: topLevelClasses
                });
              });
            });
          });
        });
      });
    });
  });
};

