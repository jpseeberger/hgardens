var express = require('express');

var swig = require('swig');
var fs = require('fs');
var path = require('path');
var db = require('../../db');


module.exports = function (app) {
  var userData;
  userData = JSON.parse(fs.readFileSync('./data/users.json'));

  app.get('/', function (req, res) {
    res.render('home', {});
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

