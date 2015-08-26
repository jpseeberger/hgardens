var express = require('express');

var swig = require('swig');
var fs = require('fs');
var path = require('path');

var db = {};
var classification_data = [];
var classes = [];
var items = [];
var groupedClasses = {};
var topLevelClasses = [];
var groupedByTopLevel = {};

// Build classifications table
// First for loop from https://gist.github.com/smrchy/7040377#file-_maketree-coffee
function queryTreeSort(callback) {
  var cfi, e, i, id, o, rfi, ri, j, k, ref, ref1, ti, topLevel, done;
  ri = [];  // Root item
  rfi = {}; // Rows from id
  cfi = {}; // Children from id
  o = [];
  ti = {};
  ref = classes;
          
  // Get top level classes and first grouped level
  for (i = 0; i < ref.length; ++i) {
    e = ref[i];
    if (cfi[e.parent_id] == null) {
      cfi[e.parent_id] = [];
    }
    cfi[e.parent_id].push(ref[i].id);
    // console.log("cfi[e.parent_id] , e.parent_id e.id: ", cfi[e.parent_id], e.parent_id, e.id);
  }
  groupedClasses  = cfi;
  topLevelClasses = cfi[null];


/*  // Group by top level
  topLevel = cfi[null];
  for (j = 0; j < topLevel.length; j++) {
    e = topLevel[j];
    ti[e] =[];
    ref1 = cfi;
    done = 0;
    while(!done){
      for (i = 0; i < ref.length; i++) {
        if(ref1[i]) {
          if(e == i){
            for (k = 0; k < ref1[i].length; k++) {
              ti[e][k] = ref1[i][k];
            }
          }
        }
      }
    }
  }

  
  // Group all elements by top level
  for (j = 0; j < topLevel.length; j++) {
    e = topLevel[j];
    ti[e] =[];
    ref1 = cfi;
    for (i = ref.length; i < 0 ; i--) {
      if(ref1[i]) {
        // Check to see if it's an element of a super group
        for (j = 0; j < cfi.length; j++) {
          e = cfi[j];
            for (k = 0; k < cfi[j].length; k++) {
              if(e == cfi[j][k]){
              ti[e][k] = ref1[i][k];
            }
          }
        }
      }
    }
  }
//  console.log("ti: ", ti);
  

  // Group by next level
  ref1 = cfi;
  topLevel = cfi[null];
  for (j = 0; j < topLevel.length; j++) {
    e = topLevel[j];
    ti[e] =[];
    for (i = 0; i < ref.length; i++) {
      if(ref1[i]) {
        if(e == i){
          for (k = 0; k < ref1[i].length; k++) {
            ti[e][k] = ref1[i][k];
          }
        }
      }
    }
  }


  ref1 = cfi;
  topLevel = cfi[null];
  for (j = 0; j < topLevel.length; j++) {
    e = topLevel[j];
    ti[e] =[];
    for (i = 0; i < ref.length; i++) {
      if(ref1[i]) {
        if(e == i){
          for (k = 0; k < ref1[i].length; k++) {
            ti[e][k] = ref1[i][k];
          }
        }
      }
    }
  }
*/
  
  groupedByTopLevel = ti;
  
  callback(classes);
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
          console.log("topLevelClasses 2: ", topLevelClasses);
          console.log("groupedClasses 2: ", groupedClasses);
          console.log("groupedByTopLevel 2: ", groupedByTopLevel);
//          console.log("classes 2: ", classes);
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
  var sqlClassifications = "SELECT * FROM classifications ORDER BY name";
  db.all(sqlClassifications, function(err, rows) {
    if (!err)
    {
      classes = rows;
//      console.log("classes: ", classes, "classes.length: ", classes.length);
      
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
  // Allow for functions above to access our database connection
  db = app.locals.db;

  app.get('/', function (req, res) {

    
    getClasses(function(classes) {
      queryTreeSort(function(classes) {
        getItems(function(items) {
          res.render('home', {
            title: "Harvest Lane Gardens", 
            inventory: items, 
            classes: groupedByTopLevel, 
            classifications: classes,
            parentClasses: topLevelClasses
          });
        });
      });
    });
  });
};

