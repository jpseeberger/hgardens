var express = require('express');

var swig = require('swig');
var fs = require('fs');
var path = require('path');


module.exports = function (app) {
  var db = app.locals.db;

  // Add photos page for displaying existing photo-classification relationship
  app.get('/photos', function (req, res) {
    if (req.userSession.loggedIn)
    {
      var sql = 'SELECT photos.*, classifications.name, classification_photo.classification_id AS cid, ';
         sql += 'classification_photo.photo_id AS pid ';
         sql += 'FROM classifications, photos, classification_photo ';
         sql += 'WHERE classifications.id = classification_photo.classification_id ';
         sql += 'AND photos.id = classification_photo.photo_id ORDER BY classifications.name';

	  db.all(sql, function(err, rows){
	    if (!err){
//          console.log('rows: ', rows);
          res.render('photos', { title: "Photos", class_photos: rows });
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

  app.get('/photos/photo_new', function (req, res) {
    res.render('photo_new', { title: "New Photo" });
  });

  app.post('/photos/photo_new', function (req, res) {
    // Create entry in classification_photo table with params ' + JSON.stringify(req.body));
    var sql = 'INSERT INTO photos (photo_name) VALUES (?)';
    db.run(sql, [req.body.photo_name], function(err, rows) {
      if (!err)
      {
        res.redirect('/photos');
      }
      else 
      {
        // on error, send nothing
        //res.json("err": err);
        console.log('err: ', err);
      }
    });
  });

  app.get('/photos/photo_class_new', function (req, res) {
    var sql = "SELECT * FROM classifications ORDER BY parent_id, name";
    db.all(sql, function(err, rows){
      if (!err){
          var sqlp = "SELECT * FROM photos ORDER BY photo_name";
          db.all(sqlp, function(err, photo_rows){
            if (!err){
              res.render('photo_class_new', { title: "Link Photo to Class", classes: rows, photos: photo_rows });
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

  app.post('/photos/photo_class_new', function (req, res) {
    // Create entry in classification_photo table with params ' + JSON.stringify(req.body));
    var sql = 'INSERT INTO classification_photo (classification_id, photo_id) VALUES (?,?)';
    db.run(sql, [req.body.classification_id, req.body.photo_id], function(err, rows) {
      if (!err)
      {
        res.redirect('/photos');
      }
      else 
      {
        // on error, send nothing
        //res.json("err": err);
        console.log('err: ', err);
      }
    });
  });

  app.get('/photos/:id', function (req, res) {
    var sql = 'SELECT photos.*, classifications.name, classification_photo.classification_id AS cid, ';
       sql += 'classification_photo.photo_id AS pid ';
       sql += 'FROM classifications, photos, classification_photo ';
       sql += 'WHERE cid =' + req.params.id + ' AND photos.id = pid AND classifications.id = cid';
    db.get(sql, function(err, rows) {
      if (!err)
      {
          var sqlp = "SELECT * FROM photos ORDER BY photo_name";
          db.all(sqlp, function(err, photo_rows){
            if (!err){
              res.render('photo_edit', { title: "Edit Class Photo", classes: rows, photos: photo_rows });
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
        //res.json("err": err);
        console.log('err: ', err);
      }
    });
  });


  app.post('/photos/:id', function (req, res) {
    // Create entry in classification_photo table with params ' + JSON.stringify(req.body));
    var sql = 'UPDATE classification_photo SET photo_id=' + req.body.photo_id ;
      sql += ' WHERE classification_photo.classification_id=' + req.body.classification_id;
    db.run(sql, function(err, rows) {
      if (!err)
      {
        res.redirect('/photos');
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

