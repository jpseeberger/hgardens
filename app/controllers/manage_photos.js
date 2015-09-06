var express = require('express');

var swig = require('swig');
var fs = require('fs');
var path = require('path');

// Insert a row into classification_photo
/*function createLink(classification, photo){
  db.run('INSERT INTO classification_photo (classification_id, photo_id) VALUES (?, ?)', [classification, photo]);
    if (!err)
    {
       console.log (classification + "," + photo);
    }
    else 
    {
      // on error, send nothing
//          res.json("err": err);
      console.log('err: ', err);
    }
}
/**/

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
  
  
  // Add photos page for displaying existing photo-classification relationship
  app.get('/photos', function (req, res) {
    if (req.userSession.loggedIn)
    {
      getClasses();
      var sql = 'SELECT classification_photo.classification_id AS cid, ';
         sql += 'classification_photo.photo_id AS pid ';
         sql += 'FROM classifications, photos, classification_photo ';
         sql += 'WHERE classifications.id = classification_photo.classification_id ';
         sql += 'AND photos.id = classification_photo.photo_id';

	  db.all(sql, function(err, rows){
	    if (!err){
          console.log('rows: ', rows);
          var sqlp = "SELECT * FROM photos ORDER BY photo_name";
          db.all(sqlp, function(err, photo_rows){
            if (!err){
//              console.log('photo_rows: ', photo_rows);
              res.render('photos', { title: "Photos", class_photos: rows, photos: photo_rows, allClasses: allClasses });
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
//        console.log('row class new: ', rows);
          var sqlp = "SELECT * FROM photos ORDER BY photo_name";
          db.all(sqlp, function(err, photo_rows){
            if (!err){
//              console.log('photo_rows: ', photo_rows);
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
        console.log('req.body.classification_id, req.body.photo_id: ', req.body.classification_id, req.body.photo_id);
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

  
};

