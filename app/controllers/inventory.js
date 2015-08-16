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
    
  var top_level_classes = [{}];
  var all_classes = [{}];
  var leaf = [];

// TEMP: all classifications
  var classes = [
    {id:1, name:'Fruit'},
    {id:2, name:'Veggie'},
    {id:8, name:'Spinach'}
  ];
    
  
  app.yesNo = [];
  app.top_level_classes = [];

  function getTopLevelClasses() {

    var sql = "SELECT * FROM classifications ";
      sql  += "WHERE parent_id IS NULL";

    db.all(sql, function(err, rows) {
      if (!err)
      {
        top_level_classes = rows;
      }
      else 
      {
        // on error, send nothing
//          res.json("err": err);
        console.log('err: ', err);
      }
    });
  }

    
    // Build classifications table
  function getClasses() {
    // Select all items where the id is not a parent_id.
    // This gives the lowest level classifications
//    var sql = "SELECT * FROM classifications ";
//      sql  += "WHERE id IN (SELECT parent_id FROM classifications)";
    
    var sql = "SELECT * FROM classifications ";
      sql  += "WHERE id IN (SELECT parent_id FROM classifications)";

    db.all(sql, function(err, rows) {
      var parent_classes = [];
      if (!err)
      {
//        top_level_classes = rows;
        for (i = 0; i < rows.length; i++)
          {
            parent_classes[i] = rows[i].id;
          }
        var parent_string = parent_classes.toString();
        var sqlLeaf = "SELECT * FROM classifications ";
          sqlLeaf  += "WHERE id NOT IN (" + parent_string + ")";

        console.log('sqlLeaf: ', sqlLeaf);
        db.all(sqlLeaf, function(err, rows) {

        console.log("rows b: ", rows);
        for (i = 0; i < rows.length; i++)
          {
            leaf[i] = rows[i].id;
          }
        console.log("leaf zz: ", leaf);
        });

        console.log("parent_classes: ", parent_classes);
        console.log("leaf z: ", leaf);
        all_classes = rows;
      }
      else 
      {
        // on error, send nothing
//          res.json("err": err);
        console.log('err: ', err);
      }
    });

  } //end getClasses() function
  

  
  // Changed this app.all back to app.get. 
  app.get('/inventory', function (req, res) {
    if (req.userSession.loggedIn)
    {
      getTopLevelClasses();
      getClasses();
      var sql = "SELECT * FROM classifications, items ";
        sql += "WHERE classification_id=classifications.id ORDER BY name";

      // Why am I doing db.all instead of db.run?  db.run doesn't return data so 
      // only use to insert data.  db.all returns data from the database.
	  db.all(sql, function(err, rows){
	    if (!err){
console.log("leaf b: ", leaf);
          console.log('all_classes: ', all_classes);
          console.log('top_level_classes: ', top_level_classes);
          res.render('inventory', { title: "Inventory", inventory: rows });
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
      res.render('inventory_new_class', { title: "New Inventory Item", classes: classes, yesNo: yesNo });
  });

  app.post('/inventory', function (req, res) {
    console.log('I would create an inventory item here with params ' + JSON.stringify(req.body));
/*    
    db.serialize(function(){
      //INSERT new inventory data into items table
      var sqlInsert = 'INSERT INTO items (grower, price, unit, unitsavailable)';
      sqlInsert += 'VALUES (?, ?, ?, ?, ?, ?)';
      db.run(sqlInsert, [req.body.grower, req.body.price, req.body.unit, req.body.bio, req.body.unitsavailable]);

      res.redirect('/inventory');
    });
*/    
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
        res.render('inventory_edit', { title: "Edit Inventory Item", classes: classes, yesNo: yesNo, item: row });
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

