var express = require('express');

var swig = require('swig');
var fs = require('fs');
var path = require('path');
var db = require('../../db');

module.exports = function (app) {

  var yesNo = [
    {id:'n', name:'n'},
    {id:'y', name:'y'}
  ];
    
  var topLevelClasses = [{}];
  var parentClasses = [{}];
  var leaf = [];

// TEMP: all classifications
  var classes = [
    {id:1, name:'Fruit'},
    {id:2, name:'Veggie'},
    {id:8, name:'Spinach'}
  ];
    
  app.yesNo = [];
  app.topLevelClasses = [];

  // Build classifications table
  function getClasses() {
    // Select all items where the parent_id is null.
    var sqlTopLevel = "SELECT * FROM classifications ";
      sqlTopLevel  += "WHERE parent_id IS NULL";

    db.all(sqlTopLevel, function(err, rows) {
      if (!err)
      {
        topLevelClasses = rows;
      }
      else 
      {
        // on error, send nothing
//          res.json("err": err);
        console.log('err: ', err);
      }
    });
    
    db.serialize(function() {
    
    // Select all items where the id is not a parent_id.
    // This gives the lowest level classifications
      var sqlParentClass = "SELECT * FROM classifications ";
        sqlParentClass  += "WHERE id IN (SELECT parent_id FROM classifications)";

      db.all(sqlParentClass, function(err, rows) {
        var parentElements = [];
        if (!err)
        {
          for (i = 0; i < rows.length; i++)
          {
            parentElements[i] = rows[i].id;
          }
          db.serialize(function(){
            var parent_string = parentElements.toString();
            var sqlLeaf = "SELECT * FROM classifications ";
              sqlLeaf  += "WHERE id NOT IN (" + parent_string + ")";

            console.log('sqlLeaf: ', sqlLeaf);
            db.all(sqlLeaf, function(err, rows) {
              if (!err){
                console.log("rows b: ", rows);
                leaf = rows;
/*                for (i = 0; i < rows.length; i++)
                {
                  leaf[i] = rows[i].id;
                } 
  */
                console.log("leaf zz: ", leaf);
              } else 
              {
                // on error, send nothing
      //          res.json("err": err);
                console.log('err: ', err);
              }
            });
          });
          parentClasses = rows;
          console.log("parentClasses: ", parentClasses);
          console.log("leaf z: ", leaf);
        }
        else 
        {
          // on error, send nothing
  //          res.json("err": err);
          console.log('err: ', err);
        }
      });
	});
  } //end getClasses() function
  

  
  // Changed this app.all back to app.get. 
  app.get('/inventory', function (req, res) {
    if (req.userSession.loggedIn)
    {
      getClasses();
      var sql = "SELECT * FROM classifications, items ";
        sql += "WHERE classification_id=classifications.id ORDER BY name";

      // Why am I doing db.all instead of db.run?  db.run doesn't return data so 
      // only use to insert data.  db.all returns data from the database.
	  db.all(sql, function(err, rows){
	    if (!err){
          console.log("leaf b: ", leaf);
          console.log('parentClasses: ', parentClasses);
          console.log('topLevelClasses: ', topLevelClasses);
          res.render('inventory', { title: "Inventory", inventory: leaf });
        } else 
        {
          // on error, send nothing
//          res.json("err": err);
          console.log('err: ', err);
        }
      });
    }
    else
      res.redirect('/login');

  });

  app.get('/inventory/new_class', function (req, res) {
      res.render('inventory_new_class', { title: "New Inventory Item", classes: parentClasses, yesNo: yesNo });
  });

  app.post('/inventory', function (req, res) {
    console.log('I would create an inventory item here with params ' + JSON.stringify(req.body));
    var sqlNewItem = 'INSERT INTO classifications (name, parent_id)';
      sqlNewItem += 'VALUES (?, ?)';
    db.run(sqlNewItem, [req.body.new_item, req.body.parent_id]);

    res.redirect('/inventory');
  });

  app.get('/inventory/:id', function (req, res) {
    // Get the item information
    var sql = "SELECT * FROM items ";
      sql  += "WHERE id=" + req.params.id;
    console.log('sql: ', sql);
    db.get(sql, function(err, row) {
      if (!err)
      {
        console.log('rows: ', row);
        res.render('inventory_edit', { title: "Edit Inventory Item", classes: parentClasses, yesNo: yesNo, item: row });
      }
      else 
      {
        // on error, send nothing
//          res.json("err": err);
        console.log('err: ', err);
      }
    });
  });

  app.post('/inventory/:id', function (req, res) {
    //console.log('I will edit an item with id of ' + req.params.id + ', values: ');
    //console.log(req.body);

    //UPDATE inventory data in items table
    var sqlUpdate = 'UPDATE items ';
      sqlUpdate += 'SET grower="' + req.body.grower + '", price=' + req.body.price + ', ';
      sqlUpdate += 'unit="' + req.body.unit + '", unitsavailable=';
      sqlUpdate += req.body.unitsavailable + ', available_next_week="';
      sqlUpdate += req.body.nextWeek + '", photo="';
      sqlUpdate += req.body.photo + '" WHERE id=' + req.params.id;
    console.log('sqlUpdate: ', sqlUpdate);
    db.run(sqlUpdate);

      res.redirect('/inventory');
  });

  app.get('/inventory/:id/delete', function (req, res) {
    // Get name of item to delete
    var sql = "SELECT *, classifications.name FROM items, classifications ";
      sql  += "WHERE items.id=" + req.params.id + " AND items.classification_id=classifications.id";
    db.get(sql, function(err, row) {
      if (!err)
      {
        console.log('rows: ', row);
        res.render('inventory_delete', { title: "Edit Inventory Item", item: row });
      }
      else 
      {
        // on error, send nothing
//          res.json("err": err);
        console.log('err: ', err);
      }
    });
     
  });

  app.post('/inventory/:id/delete', function (req, res) {
    console.log('I would delete inventory item #' + req.params.id + ' body ' + req.body.id);

    //UPDATE inventory data in items table
    var sqlDelete = 'DELETE FROM items WHERE classification_id=' + req.params.id;
    console.log('sqlDelete: ', sqlDelete);
    db.run(sqlDelete);

    res.redirect('/inventory');
  });

};

