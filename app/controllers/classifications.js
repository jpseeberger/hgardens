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

    
};

