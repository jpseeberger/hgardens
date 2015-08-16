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
    
    // TEMP: all classifications
    var classes = [
      {id:1, name:'Fruit'},
      {id:2, name:'Veggie'},
      {id:8, name:'Spinach'}
    ];
    
  
  app.inventory_data = {};
  app.yesNo = [];
  app.classes = [];
  classification_data = [];

  // Build classifications table
/*  
  function getClasses() {
    var classes = [{}];
    var top_level = [{}];
    // Get all the item information
    var sql = "SELECT * FROM classifications ";
      sql  += "WHERE parent_id= IS NULL";
    
    console.log('sql: ', sql);
    db.all(sql, function(err, rows) {
      if (!err)
      {
        console.log('classes rows: ', rows);
        top_level = rows;
      }
      else 
      {
        // on error, send nothing
//          res.json("err": err);
        console.log('err: ', err);
      }
    });

  } //end getClasses() function
  
  // Build classifications table.  
  //display the database on /data
  app.get('/data', function(req, res){
    db.all('SELECT * FROM classifications ORDER BY name', function(err, rows){
      //build an object here - keys are mentor types, values are an array
      //easy way to do grouping without knowing all the info ahead of time
      var classes = {}; 
      var ret = {nodes: [], links: []};
      var umap = {}, smap = {};
      for (x = 0; x < rows.length; x++)
      {
          var row = rows[x]; // we are adding mentors into the appropriate groups
          if (!groups[row.mentor_type]) groups[row.mentor_type] = (Object.keys(groups).length+1); //if the mentor type doesn't exist, add it

          //add a node
          var node = {name: row.username, group: groups[row.mentor_type]};
          umap[row.id] = ret.nodes.length;
          ret['nodes'].push(node);
      }
      //we can nest a select inside a select
      //add a node for a new skill
      db.all('SELECT id, skill_name FROM skills', function(err, rows){
          var skillsGroup = (Object.keys(groups).length + 1);
          var skills = {};	

          for (x = 0; x < rows.length; x++)
          {
              var node = {name: rows[x].skill_name, skill: true, group: skillsGroup};
              smap[rows[x].id] = ret.nodes.length;
              ret.nodes.push(node);
          };

          //add a link???
          db.all('SELECT user_skills.user_id AS uid, user_skills.skill_id AS sid FROM users, skills, user_skills WHERE users.id = user_skills.user_id AND skills.id = user_skills.skill_id', function(err, rows){ //in db.all, you have an error and an array of objects
              console.log(umap);
              console.log(smap);
              rows.forEach(function(row){
                  var obj = {"source": umap[row.uid], "target": smap[row.sid]};
                  ret['links'].push(obj);
              });
              res.json(ret);

          });								
      });
    });
  });
*/  

  
  //Create the classes array of objects
  fs.readFile('./data/inventory.json', 'utf-8', function(err, data) {
    if(!err)
    { 
      inventory_data = JSON.parse(data);
      // Make array of classification_data types for menu.
      for (var i = 0; i < inventory_data.inventory.length ; i++) {
        var j;
        if (i == 0) {
          j = 0;
          classification_data[0] = inventory_data.inventory[0].classification;
          j++;
        } else if (inventory_data.inventory[i].classification != inventory_data.inventory[i-1].classification)
        {
          classification_data[j] = inventory_data.inventory[i].classification;
          j++;
        }
      }

      //    res.json(data);
    } 
    else 
    {
      // on error, send nothing
      //    res.json("err": err);
    }
  }); 

    
  // Changed this app.all back to app.get. 
  app.get('/inventory', function (req, res) {
    if (req.userSession.loggedIn)
    {
        var sql = "SELECT * FROM classifications, items ";
        sql += "WHERE classification_id=classifications.id ORDER BY name";

      // Why am I doing db.all instead of db.run?  db.run doesn't return data so 
      // only use to insert data.  db.all returns data from the database.
	  db.all(sql, function(err, rows){
	    if (!err){
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

  app.get('/inventory/new', function (req, res) {
      res.render('inventory_new', { title: "New Inventory Item", classes: classes, yesNo: yesNo });
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
    var sql = "SELECT classifications.name FROM items, classifications ";
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
    console.log('I would delete inventory item #' + req.params.id);

    //UPDATE inventory data in items table
    var sqlDelete = 'DELETE FROM items WHERE id=' + req.params.id;
    console.log('sqlDelete: ', sqlDelete);
    db.run(sqlDelete);

    res.redirect('/inventory');
  });



};

