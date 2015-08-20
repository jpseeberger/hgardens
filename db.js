var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./data/inventory.db');

db.run("PRAGMA foreign_keys = ON;");

module.exports = db.serialize(function() {
    
  db.run("CREATE TABLE IF NOT EXISTS classifications ("+
      "id INTEGER PRIMARY KEY , " +
      "name TEXT UNIQUE, " +
      "parent_id INTEGER DEFAULT NULL" +
  ");");

  db.run("CREATE TABLE IF NOT EXISTS growers ("+
      "id INTEGER PRIMARY KEY, " +
      "first_name TEXT NOT NULL, " +
      "last_name TEXT, " +
      "email TEXT" +
      "phone_number TEXT" +
      "web_page TEXT" +
  ");");

  db.run("CREATE TABLE IF NOT EXISTS photos ("+
      "id INTEGER PRIMARY KEY, " +
      "thumbnail TEXT DEFAULT 'default.jpg', " +
      "small TEXT, " +
      "medium TEXT" +
      "large TEXT" +
      "lightbox TEXT" +
      "photo_link TEXT" +
  ");");

  db.run("CREATE TABLE IF NOT EXISTS units ("+
      "id INTEGER PRIMARY KEY, " +
      "primary_unit TEXT DEFAULT 'bunch', " +
      "bulk_unit TEXT DEFAULT 'lb', " +
      "grower_unit TEXT DEFAULT 'lb' " +
  ");");

  db.run("CREATE TABLE IF NOT EXISTS items ("+
    "id INTEGER PRIMARY KEY, " +
    "classification_id INTEGER NOT NULL, " +
    "grower TEXT, " +
    "price INTEGER DEFAULT 0, " +
    "unit TEXT, " +
    "unitsavailable INTEGER DEFAULT 0, " +
    "available_next_week TEXT NOT NULL DEFAULT 'n', " +
    "full_list TEXT NOT NULL DEFAULT 'n', " +
    "FOREIGN KEY (classification_id) REFERENCES classifications(id)" + 
  ");");

});


