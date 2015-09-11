var express = require('express');

var swig = require('swig');
var fs = require('fs');
var path = require('path');

module.exports = function (app) {
  var db = app.locals.db;

  // Add classifications page for displaying existing classifications
  app.get('/classifications', function (req, res) {
    if (req.userSession.loggedIn)
    {
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

  app.get('/class_order', function (req, res) {
    var sql = "SELECT * FROM top_level_order, classifications ";
      sql  += "WHERE top_level_order.classification_id=classifications.id ";
      sql  += "AND classifications.parent_id IS NULL ORDER BY top_level_order.level_order, classifications.name";
    db.all(sql, function(err, rows){
      if (!err){
        res.render('class_order', { title: "Set Top Level Classifications Order", class_order: rows });
      } 
      else 
      {
        // on error, send nothing
        // res.json("err": err);
        console.log('err: ', err);
      }
    });
  });

  app.get('/class_order/class_order_new', function (req, res) {
    var sql = "SELECT * FROM classifications WHERE classifications.parent_id IS NULL ";
      sql  += "AND classifications.id NOT IN (SELECT top_level_order.classification_id FROM top_level_order) ";
      sql  += "ORDER BY classifications.name";
    db.all(sql, function(err, rows){
      if (!err){
        var sqlt = "SELECT * FROM top_level_order ";
        db.all(sqlt, function(err, top_level_rows){
          if (!err){
          var sqlc = "SELECT COUNT(classifications.id) AS numClasses FROM classifications ";
            sqlc  += "WHERE classifications.parent_id IS NULL ";
          db.all(sqlc, function(err, order_rows){
            if (!err){
              console.log('order_rows: ', order_rows[0].numClasses);

              var availableNumbers = [];
              var wasFound;
              // Determine available numbers for ordering
              // If the number is already in use, it's not available.
              for (var i = 1; i < order_rows[0].numClasses + 1; i++)
              {
                wasFound = 0;
                for (var j = 0; j < top_level_rows.length; j++)
                {
                  if (i == top_level_rows[j].level_order)
                  {
                    wasFound = 1;
                  }
                }
                if (!wasFound)
                {
                  availableNumbers.push(i);
                }
              }

              console.log('availableNumbers: ', availableNumbers);
              console.log('class_order: ', rows);
              console.log('top_level_rows: ', top_level_rows);
              res.render('class_order_new', { title: "Add New Top Level Class Order", class_order: rows,  availableNumbers: availableNumbers });
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
      else 
      {
        // on error, send nothing
        // res.json("err": err);
        console.log('err: ', err);
      }
    });
  });

  app.post('/class_order/class_order_new', function (req, res) {
    // Create entry in classification_photo table with params ' + JSON.stringify(req.body));
//    console.log('req.body: ', req.body);
    var sql = 'INSERT INTO top_level_order (classification_id, level_order) VALUES (?,?)';
    db.run(sql, [req.body.classification_id, req.body.level_order], function(err, rows) {
      if (!err)
      {
        res.redirect('/class_order');
      }
      else 
      {
        // on error, send nothing
        //res.json("err": err);
        console.log('err: ', err);
      }
    });
  });


  app.get('/class_order/:id', function (req, res) {
    var sql = "SELECT * FROM classifications WHERE classifications.id=" + req.params.id;
    db.all(sql, function(err, rows){
      if (!err){
        var sqlo = "SELECT * FROM top_level_order";
        db.all(sqlo, function(err, order_rows){
          if (!err){
              var availableNumbers = [];
              for (var i = 1; i < order_rows.length + 1; i++)
              {
                availableNumbers.push(i);
              }

              console.log('availableNumbers: ', availableNumbers);
            console.log('rows: ', rows);
            console.log('order_rows: ', order_rows);
            res.render('class_order_edit', { title: "Edit Top Level Classifications Order", class_order: rows, levels: availableNumbers});
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
  });

  app.post('/class_order/:id', function (req, res) {
    // Create entry in classification_photo table with params ' + JSON.stringify(req.body));
    console.log('req.body: ', req.body);
    var sql = 'UPDATE top_level_order SET level_order=' + req.body.level_order;
       sql += ' WHERE classification_id=' + req.body.classification_id;
    db.run(sql, function(err, rows) {
      if (!err)
      {
        res.redirect('/class_order');
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

