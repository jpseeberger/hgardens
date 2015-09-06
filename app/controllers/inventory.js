var express = require('express');

var swig = require('swig');
var fs = require('fs');
var path = require('path');

  var yesNo = [
    {id:'n', name:'n'},
    {id:'y', name:'y'}
  ];
    
// TEMP: all classifications
  var growers = [
    {id:1, name:'rox'},
    {id:2, name:'loren'},
    {id:3, name:'jon'}
  ];


module.exports = function (app) {
  var db = app.locals.db;

  // Build classifications table
  function getClasses() {
    // Select all items where the parent_id is null.
    var sqlTopLevel = "SELECT * FROM classifications ";
      sqlTopLevel  += "WHERE parent_id IS NULL ORDER BY name";

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
    
    var sqlAllClasses = "SELECT * FROM classifications ORDER BY parent_id, name";
    db.all(sqlAllClasses, function(err, rows) {
      if (!err)
      {
        allClasses = rows;
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
      getClasses();
      var sql = "SELECT * FROM items, classifications ";
        sql += "WHERE classification_id=classifications.id ORDER BY name";

      // Why am I doing db.all instead of db.run?  db.run doesn't return data so 
      // only use to insert data.  db.all returns data from the database.
	  db.all(sql, function(err, rows){
	    if (!err){
          console.log('topLevelClasses: ', topLevelClasses);
          res.render('inventory', { title: "Inventory", inventory: rows });
        } 
        else 
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

  app.get('/inventory/new_item', function (req, res) {
    var sql = "SELECT * FROM classifications WHERE parent_id IS NOT NULL ORDER BY parent_id, name";
    db.all(sql, function(err, rows){
      if (!err){
        res.render('inventory_new_item', { title: "New Inventory Item", classes: rows, grower: growers, yesNo: yesNo });
      } 
      else 
      {
        // on error, send nothing
        // res.json("err": err);
        console.log('err: ', err);
      }
    });
  });

  app.post('/inventory', function (req, res) {
      // Create an inventory item with params ' + JSON.stringify(req.body));
    var sqlNewItem = 'INSERT INTO items (classification_id, grower, price, ';
      sqlNewItem += 'unit, unitsavailable, available_next_week, full_list)';
      sqlNewItem += 'VALUES (?, ?, ?, ?, ?, ?, ?)';
    console.log('sqlNewItem: ', sqlNewItem);
    db.run(sqlNewItem, [parseInt(req.body.classification, 10), req.body.grower, parseInt(req.body.price, 10), req.body.unit, parseInt(req.body.unitsavailable, 10), req.body.available_next_week, req.body.full_list], function(err, rows) {
      if (!err)
      {
        res.redirect('/inventory');
      }
      else 
      {
        // on error, send nothing
        //res.json("err": err);
        console.log('err: ', err);
      }
    });
  });

  app.get('/inventory/:id', function (req, res) {
    getClasses();
    // Get the item information
    var sqlEdit = "SELECT * FROM items ";
      sqlEdit  += "WHERE classification_id=" + req.params.id;
    console.log('sqlEdit: ', sqlEdit);
    db.get(sqlEdit, function(err, row) {
      if (!err)
      {
        console.log('rowEdit: ', row);
        res.render('inventory_edit', { title: "Edit Inventory Item", classes: allClasses, yesNo: yesNo, grower: growers, item: row });
      }
      else 
      {
        // on error, send nothing
        //res.json("err": err);
        console.log('err: ', err);
      }
    });
  });

  app.post('/inventory/:id', function (req, res) {
//    console.log('I will edit an item with id of ' + req.params.id + ', values: ');
  
    var growerName = growers[req.body.grower - 1].name;
    var sqlUpdate = 'UPDATE items ';
      sqlUpdate += 'SET grower="' + growerName + '", price=' + req.body.price + ', ';
      sqlUpdate += 'unit="' + req.body.unit + '", unitsavailable=';
      sqlUpdate += req.body.unitsavailable + ', available_next_week="';
      sqlUpdate += req.body.nextWeek + '", full_list="';
      sqlUpdate += req.body.full_list + '" WHERE id=' + req.params.id;
    console.log('sqlUpdate: ', sqlUpdate);
    db.run(sqlUpdate, function(err, rows) {
      if (!err)
      {
        res.redirect('/inventory');
      }
      else 
      {
        // on error, send nothing
        //res.json("err": err);
        console.log('err: ', err);
      }
    });
  });

  app.get('/inventory/:id/delete', function (req, res) {
    // Get name of item to delete
    var sql = "SELECT *, classifications.name FROM items, classifications ";
      sql  += "WHERE items.id=" + req.params.id + " AND items.classification_id=classifications.id";
    db.get(sql, function(err, row) {
      if (!err)
      {
        console.log('row: ', row);
        res.render('inventory_delete', { title: "Edit Inventory Item", item: row });
      }
      else 
      {
        // on error, send nothing
        //res.json("err": err);
        console.log('err: ', err);
      }
    });
     
  });

  app.post('/inventory/:id/delete', function (req, res) {
    // Delete inventory item #' + req.params.id + ' body ' + req.body.id);
    var sqlDelete = 'DELETE FROM items WHERE classification_id=' + req.params.id;
    //console.log('sqlDelete: ', sqlDelete);
    db.run(sqlDelete, function(err, rows) {
      if (!err)
      {
        res.redirect('/inventory');
      }
      else 
      {
        // on error, send nothing
        //res.json("err": err);
        console.log('err: ', err);
      }
    });
  });
  
  // Add classifications page for displaying existing classifications
  app.get('/classifications', function (req, res) {
    if (req.userSession.loggedIn)
    {
      getClasses();
      var sql = "SELECT * FROM classifications ORDER BY parent_id, name";

      // Why am I doing db.all instead of db.run?  db.run doesn't return data so 
      // only use to insert data.  db.all returns data from the database.
	  db.all(sql, function(err, rows){
	    if (!err){
//          console.log('row class: ', rows);
          res.render('classifications', { title: "Classifications", classifications: rows });
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
      res.redirect('/login');

  });

  app.get('/classifications/new_class', function (req, res) {
    var sql = "SELECT * FROM classifications ORDER BY parent_id, name";
    db.all(sql, function(err, rows){
      if (!err){
//        console.log('row class new: ', rows);
        res.render('classifications_new', { title: "New Classification Item", classes: rows });
      } 
      else 
      {
        // on error, send nothing
        // res.json("err": err);
        console.log('err: ', err);
      }
    });
  });

  app.post('/classifications', function (req, res) {
//    console.log('I would create classification item here with params ' + JSON.stringify(req.body));
    if(req.body.parent_id != "null") 
    {
      var sqlNewItem = 'INSERT INTO classifications (name, parent_id)';
        sqlNewItem += 'VALUES (?, ?)';
      db.run(sqlNewItem, [req.body.new_item, req.body.parent_id], function(err, rows) {
        if (!err)
        {
          res.redirect('/classifications');
        }
        else 
        {
          // on error, send nothing
          //res.json("err": err);
          console.log('err: ', err);
        }
      });
    }
    else
    {
      var sqlNewClass = 'INSERT INTO classifications (name)';
        sqlNewClass += 'VALUES (?)';
      db.run(sqlNewClass, [req.body.new_item], function(err, rows) {
        if (!err)
        {
          res.redirect('/classifications');
        }
        else 
        {
          // on error, send nothing
          //res.json("err": err);
          console.log('err: ', err);
        }
      });
    }
  });


};

