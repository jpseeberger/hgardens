var express = require('express');

var swig = require('swig');
var fs = require('fs');
var path = require('path');

var db = {};
var classes = [];
var items = [];
var leaves = [];
var availableNow = [];
var nextWeek = [];
var fullList = [];
var topLevelClasses = [];
var topLevelClassesArray = [];
var topLevelNow = [];
var topLevelNextWeek = [];
var topLevelFullList = [];
var topLevelNowArray = [];
var topLevelNextWeekArray = [];
var topLevelFullListArray = [];
var tmpNow = [];
var tmpNextWeek = [];
var tmpFullList = [];


// http://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
// This is how it's usually done. The idea is to place each element in a hashtable and then check for its presence instantly. This gives us linear time, but has at least two drawbacks:
// since hash keys can only be strings in Javascript, this code doesn't distinguish numbers and "numeric strings". That is, uniq([1,"1"]) will return just [1]
// for the same reason, all objects will be considered equal: uniq([{foo:1},{foo:2}]) will return just [{foo:1}]
function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
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
      for (var i = 0; i < leaves.length; i++)
      {
        topParentFound = 0;
        while (!topParentFound)
        {
          if(topLevelClassesArray.indexOf(leaves[i].parent_id) > -1)
          {
            topParentFound = 1;
          }
          else
          {
            for (var k = 0; k < classes.length; k++)
            {
              if(leaves[i].parent_id == classes[k].id)
              {
                leaves[i].parent_id = classes[k].parent_id;
                break;
              }
            }
          }
        }
      }
      // console.log("leaves: ", leaves);

      // Determine availability of inventory items.
      for (var j = 0; j < leaves.length; j++)
      {
        if(leaves[j].unitsavailable != 0)
        {
          availableNow.push(leaves[j]);
          topLevelNowArray.push(leaves[j].parent_id);
        }
        if(leaves[j].available_next_week == 'y')
        {
          nextWeek.push(leaves[j]);
          topLevelNextWeekArray.push(leaves[j].parent_id);
        }
        if(leaves[j].full_list == 'y')
        {
          fullList.push(leaves[j]);
          topLevelFullListArray.push(leaves[j].parent_id);
        }
      }

      tmpNow = uniq(topLevelNowArray);
      tmpNextWeek = uniq(topLevelNextWeekArray);
      tmpFullList = uniq(topLevelFullListArray);

      for (var j = 0; j < topLevelClasses.length; j++)
      {
        for (var k = 0; k < tmpNow.length; k++)
        {
          if (tmpNow[k] == topLevelClasses[j].id)
          {
            topLevelNow.push(topLevelClasses[j]);
          }
        }
        for (var k = 0; k < tmpNextWeek.length; k++)
        {
          if (tmpNextWeek[k] == topLevelClasses[j].id)
          {
            topLevelNextWeek.push(topLevelClasses[j]);
          }
        }
        for (var k = 0; k < tmpFullList.length; k++)
        {
          if (tmpFullList[k] == topLevelClasses[j].id)
          {
            topLevelFullList.push(topLevelClasses[j]);
          }
        }
      }
      
      console.log("topLevelNowArray: ", topLevelNowArray);
      console.log("topLevelNextWeekArray: ", topLevelNextWeekArray);
      console.log("topLevelFullListArray: ", topLevelFullListArray);
      console.log("topLevelNow: ", topLevelNow);
      console.log("topLevelNextWeek: ", topLevelNextWeek);
      console.log("topLevelFullList: ", topLevelFullList);

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
        groupLeavesByTopLevel(function(leaves) {
          res.render('home', {
            title: "Harvest Lane Gardens", 
            classifications: classes,
            inventory: leaves, 
            parentClasses: topLevelNow,
            parentClassesNextWeek: topLevelNextWeek,
            parentClassesFullList: topLevelFullList
          });
        });
      });
    });
  });
};

