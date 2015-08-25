var express = require('express');

var swig = require('swig');
var fs = require('fs');
var path = require('path');


module.exports = function (app) {
  var userData;

  // Admin user information from flat JSON file
  // Ensure data directory exists
  fs.mkdir(app.locals.config.data_dir, function(e) {
    try
    {
      if (!e || e.code === 'EEXIST')
      {
        // Data directory is present
        // Read in the admin information (if exists, if not: no exception will be thrown)
        userData = JSON.parse(fs.readFileSync(app.locals.config.data_dir + 'users.json'));
      }
      else
      {
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

