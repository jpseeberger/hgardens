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
var displayOrder = [];

var selectedItems = [];
var selectedQuantities = [];
var totalPrice = 0;
var totalInvoice = 0;
var quantity = [
  {id:'0', name:"0"},
  {id:'1', name:"1"},
  {id:'2', name:"2"},
  {id:'3', name:"3"},
  {id:'4', name:"4"},
  {id:'5', name:"5"},
  {id:'6', name:"6"},
  {id:'7', name:"7"},
  {id:'8', name:"8"},
  {id:'9', name:"9"},
  {id:'10', name:"10"},
  {id:'11', name:"11"},
  {id:'12', name:"12"},
  {id:'13', name:"13"},
  {id:'14', name:"14"},
  {id:'15', name:"15"},
  {id:'16', name:"16"},
  {id:'17', name:"17"},
  {id:'18', name:"18"},
  {id:'19', name:"19"},
  {id:'20', name:"20"}
];



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
//      console.log("classes: ", classes);
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

function getPhotos(callback) 
{
//  var sqlClassifications = "SELECT * FROM classifications ORDER BY name";
  var sql = 'SELECT photos.*, classification_photo.classification_id AS cid, ';
     sql += 'classification_photo.photo_id AS pid ';
     sql += 'FROM classifications, photos, classification_photo ';
     sql += 'WHERE classifications.id = classification_photo.classification_id ';
     sql += 'AND photos.id = classification_photo.photo_id ORDER BY photo_name';
  db.all(sql, function(err, class_photos) {
    if (!err)
    {
//      console.log("class_photos home: ", class_photos);
      callback(class_photos);
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
//      console.log("topLevelClasses: ", topLevelClasses);
      
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
    sqlLeaves  += "ORDER BY classifications.parent_id, classifications.name";
  db.all(sqlLeaves, function(err, rows) {
    var topParentFound = 0;
    if (!err)
    {
      var sql = "SELECT * FROM top_level_order ORDER BY level_order, classification_id";
      db.all(sql, function(err, level_order_rows){
        if (!err){
//          console.log("level_order_rows: ", level_order_rows);
          
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
          availableNow = [];
          nextWeek = [];
          fullList = [];
          topLevelNow = [];
          topLevelNextWeek = [];
          topLevelFullList = [];
          topLevelNowArray = [];
          topLevelNextWeekArray = [];
          topLevelFullListArray = [];
          tmpNow = [];
          tmpNextWeek = [];
          tmpFullList = [];

          // Determine availability of inventory items now, next week and full list
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

          // Find the top level classes for each of the following:
          // available now, available next week and the full list
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
          
          // Now set the order in which to display the available now categories
          displayOrder = [];
          for (var jj = 0; jj < level_order_rows.length; jj++)
          {
            for (var kk = 0; kk < topLevelNow.length; kk++)
            {
              if (topLevelNow[kk].id == level_order_rows[jj].classification_id)
              {
                displayOrder.push(topLevelNow[kk]);
              }
            }
          }

//          console.log("topLevelNow: ", topLevelNow);
//          console.log("displayOrder: ", displayOrder);
    //      console.log("topLevelNextWeek: ", topLevelNextWeek);
    //      console.log("topLevelFullList: ", topLevelFullList);


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
    else 
    {
      // on error, send nothing
      // res.json("err": err);
      console.log('err: ', err);
    }
  });
} 



function getSeletedLeaves(selectedItemsBody, callback) 
{
  // Select all classifications where the id is also a classification_id in items.
  // This gives the lowest level classifications
  var sqlLeaves = "SELECT classifications.*, items.* FROM classifications, items ";
    sqlLeaves  += "WHERE ((classifications.id IN (SELECT items.classification_id FROM items)) ";
    sqlLeaves  += "AND (classifications.id = items.classification_id)) ";
    sqlLeaves  += "ORDER BY classifications.parent_id, classifications.name";
  db.all(sqlLeaves, function(err, rows) {
    var topParentFound = 0;
    if (!err)
    {
      var sql = "SELECT * FROM top_level_order ORDER BY level_order, classification_id";
      db.all(sql, function(err, level_order_rows){
        if (!err){
          // Find just the items that were selected.
          selectedItems = [];
          selectedQuantities = [];
          totalInvoice = 0;

          for (var i = 0; i < Object.keys(selectedItemsBody.classification_id).length; i++)
          {
            if(selectedItemsBody.quantity[i] != '0')
            {
              totalPrice = 0;
              for (var k = 0; k < rows.length; k++)
              {
                if(selectedItemsBody.classification_id[i] == rows[k].classification_id)
                {
                  totalPrice = rows[k].price * parseInt(selectedItemsBody.quantity[i], 10);
                  var obj = {"classification_id": selectedItemsBody.classification_id[i], "quantity": selectedItemsBody.quantity[i], "totalPrice": totalPrice};
                  selectedItems.push(rows[k]);
                  selectedQuantities.push(obj);
                  totalInvoice += totalPrice;
                }
              }
            }
          }

//          console.log("selectedQuantities: ", selectedQuantities);

          
          leaves = selectedItems;
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
          availableNow = [];
          topLevelNow = [];
          topLevelNowArray = [];
          tmpNow = [];

          // Determine availability of inventory items now, next week and full list
          for (var j = 0; j < leaves.length; j++)
          {
            if(leaves[j].unitsavailable != 0)
            {
              availableNow.push(leaves[j]);
              topLevelNowArray.push(leaves[j].parent_id);
            }
          }

          // Find the top level classes for each of the following:
          // available now, available next week and the full list
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
          }
          
          // Now set the order in which to display the available now categories
          displayOrder = [];
          for (var jj = 0; jj < level_order_rows.length; jj++)
          {
            for (var kk = 0; kk < topLevelNow.length; kk++)
            {
              if (topLevelNow[kk].id == level_order_rows[jj].classification_id)
              {
                displayOrder.push(topLevelNow[kk]);
              }
            }
          }

//          console.log("topLevelNow: ", topLevelNow);
//          console.log("displayOrder: ", displayOrder);
    //      console.log("topLevelNextWeek: ", topLevelNextWeek);
    //      console.log("topLevelFullList: ", topLevelFullList);


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

  // http://stackoverflow.com/questions/4268272/javascript-capitalization-of-each-word-in-string
  // http://www.mediacollege.com/internet/javascript/text/case-capitalize.html
  // The problem is that it also capitalizes chars that are foreigns such as Böar -> BöAr 
  String.prototype.capitalize = function(){
    return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
  };



  app.get('/', function (req, res) {
    
    getClasses(function(classes) {
      getTopLevelClasses(function(classes) {
      getPhotos(function(class_photos) {
        groupLeavesByTopLevel(function(leaves) {
          res.render('home', {
            title: "Harvest Lane Gardens", 
            classifications: classes,
            class_photos: class_photos, 
            inventory: availableNow, 
            nextWeek: nextWeek, 
            fullList: fullList, 
            displayOrder: displayOrder, 
            parentClasses: topLevelNow,
            parentClassesNextWeek: topLevelNextWeek,
            parentClassesFullList: topLevelFullList
          });
        });
      });
      });
    });
  });
  
  
  
  
  
  app.get('/check_list', function (req, res) {
    
    getClasses(function(classes) {
      getTopLevelClasses(function(classes) {
      getPhotos(function(class_photos) {
        groupLeavesByTopLevel(function(leaves) {
          res.render('check_list', {
            title: "Harvest Lane Gardens Check List", 
            classifications: classes,
            class_photos: class_photos, 
            inventory: availableNow, 
            quantity: quantity, 
            displayOrder: displayOrder, 
            parentClasses: topLevelNow
          });
        });
      });
      });
    });
  });
 
  
  app.post('/check_list_finalize', function (req, res) {
    // Delete inventory item #' + req.params.id + ' body ' + req.body.id);
    getClasses(function(classes) {
      getTopLevelClasses(function(classes) {
      getPhotos(function(class_photos) {
        getSeletedLeaves(req.body, function(leaves) {
          res.render('check_list_finalize', {
            title: "Harvest Lane Gardens Check List", 
            classifications: classes,
            class_photos: class_photos, 
            inventory: availableNow, 
            selectedQuantities: selectedQuantities,
            totalInvoice: totalInvoice, 
            displayOrder: displayOrder, 
            parentClasses: topLevelNow
          });
        });
      });
      });
    });
  });
  
  
};

