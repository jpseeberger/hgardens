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

var units = [
  {id:1, name:'each'},
  {id:2, name:'3 count'},
  {id:3, name:'half pint'},
  {id:4, name:'pint'},
  {id:5, name:'quart'},
  {id:6, name:'lb'},
  {id:7, name:'bunch'}
];

module.exports = function (app) {
  var db = app.locals.db;

  app.get('/inventory', function (req, res) {
    if (req.userSession.loggedIn)
    {
      var sql = "SELECT * FROM items, classifications ";
        sql += "WHERE items.classification_id=classifications.id ORDER BY name";

      db.all(sql, function(err, rows){
        if (!err){
          var sql = 'SELECT photos.*, classification_photo.classification_id AS cid, ';
             sql += 'classification_photo.photo_id AS pid ';
             sql += 'FROM classifications, photos, classification_photo ';
             sql += 'WHERE classifications.id = classification_photo.classification_id ';
             sql += 'AND photos.id = classification_photo.photo_id ORDER BY photo_name';

          db.all(sql, function(err, class_photo_rows){
            if (!err){
//              console.log('items: ', rows);
//              console.log('class_photo_rows: ', class_photo_rows);
              res.render('inventory', { title: "Inventory", inventory: rows, class_photos: class_photo_rows });
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
        res.render('inventory_new_item', { title: "New Inventory Item", classes: rows, units: units, grower: growers, yesNo: yesNo });
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
     var sqlAllClasses = "SELECT * FROM classifications ORDER BY parent_id, name";
    db.all(sqlAllClasses, function(err, rows) {
      if (!err)
      {
        allClasses = rows;
        // Get the item information
        var sqlEdit = "SELECT * FROM items ";
          sqlEdit  += "WHERE classification_id=" + req.params.id;
        db.get(sqlEdit, function(err, row) {
          if (!err)
          {
//            console.log('rowEdit: ', row);
            res.render('inventory_edit', { title: "Edit Inventory Item", classes: allClasses, units: units, grower: growers, yesNo: yesNo, item: row });
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
        // on error, send nothing
//          res.json("err": err);
        console.log('err: ', err);
      }
    });
  });

  app.post('/inventory/:id', function (req, res) {
//    console.log('I will edit an item with id of ' + req.params.id + ', values: ');
  
    var growerName = growers[req.body.grower - 1].name;
    var unitName = units[req.body.unit - 1].name;
    var sqlUpdate = 'UPDATE items ';
      sqlUpdate += 'SET grower="' + growerName + '", price=' + req.body.price + ', ';
      sqlUpdate += 'unit="' + unitName + '", unitsavailable=';
      sqlUpdate += req.body.unitsavailable + ', available_next_week="';
      sqlUpdate += req.body.nextWeek + '", full_list="';
      sqlUpdate += req.body.full_list + '" WHERE id=' + req.params.id;
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
    var sql = 'DELETE FROM items WHERE classification_id=' + req.params.id;
    db.run(sql, function(err, rows) {
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
  
     
};

