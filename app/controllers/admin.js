var express = require('express');

var swig = require('swig');
var fs = require('fs');
var path = require('path');
var db = require('../../db');


module.exports = function (app) {
  var userData;

  // Admin user information from flat JSON file
  // Ensure data directory exists
  fs.mkdir('./data', function(e) {
    try
    {
      if (!e || e.code === 'EEXIST')
      {
        // Data directory is present
        // Read in the admin information (if exists, if not: no exception will be thrown)
        userData = JSON.parse(fs.readFileSync('./data/users.json'));
      }
      else
      {
      console.log('Here');
        throw e;
      }
    }
    catch (e)
    {
      userData = {};
      console.log('Problems getting the admin login information [No logins will be possible]:\n', e);
    }
  });

  app.get('/login', function (req, res) {
    res.render('login', {});
  });

  app.post('/login', function (req, res) {
   if(req.body.email==userData.admin.email && req.body.password==userData.admin.password)
    {
      req.userSession.loggedIn = true;
      res.redirect('/inventory');
    } else 
      res.redirect('/login');
  });
    
};

