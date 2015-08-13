var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./data/inventory.db');

db.run("PRAGMA foreign_keys = ON;");

module.exports = db.serialize(function() {
    
  db.run("CREATE TABLE IF NOT EXISTS classifications ("+
      "id INTEGER PRIMARY KEY , " +
      "name TEXT NOT NULL UNIQUE, " +
      "parent_id INTEGER" +
  ");");
/*
  db.run("CREATE TABLE IF NOT EXISTS growers ("+
      "id INTEGER PRIMARY KEY, " +
      "first_name TEXT NOT NULL, " +
      "last_name TEXT, " +
      "email TEXT" +
      "phone_number TEXT" +
      "web_page TEXT" +
  ");");
*/
  db.run("CREATE TABLE IF NOT EXISTS items ("+
    "id INTEGER PRIMARY KEY, " +
    "classification_id INTEGER NOT NULL, " +
    "grower TEXT NOT NULL, " +
    "price INTEGER NOT NULL, " +
    "unit TEXT NOT NULL, " +
    "unitsavailable INTEGER NOT NULL, " +
    "available_next_week TEXT DEFAULT 'n', " +
    "photo TEXT DEFAULT 'n', " +
    "FOREIGN KEY (classification_id) REFERENCES classifications(id)" + 
  ");");

});


