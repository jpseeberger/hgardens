var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./data/inventory.db');

db.run("PRAGMA foreign_keys = ON;");

module.exports = db.serialize(function() {
    
  db.run("CREATE TABLE IF NOT EXISTS classifications ("+
      "id INTEGER PRIMARY KEY , " +
      "name TEXT NOT NULL, " +
      "parent_id INTEGER NOT NULL" +
  ");");

  db.run("CREATE TABLE IF NOT EXISTS growers ("+
      "id INTEGER PRIMARY KEY, " +
      "first_name TEXT NOT NULL, " +
      "last_name TEXT, " +
      "email TEXT" +
      "phone_number TEXT" +
      "web_page TEXT" +
  ");");

  db.run("CREATE TABLE IF NOT EXISTS items ("+
    "id INTEGER PRIMARY KEY, " +
    "classification_id INTEGER NOT NULL, " +
    "price INTEGER NOT NULL, " +
    "unit TEXT NOT NULL, " +
    "unitsavailable INTEGER NOT NULL, " +
    "FOREIGN KEY (classification_id) REFERENCES classifications(id)" + 
  ");");

  db.run("CREATE TABLE IF NOT EXISTS item_growers ("+
    "item_id INTEGER NOT NULL, " +
    "grower_id INTEGER NOT NULL, " +
    "FOREIGN KEY(item_id) REFERENCES items(id), " +
    "FOREIGN KEY(grower_id) REFERENCES growers(id)" +
  ");");

  db.run("CREATE TABLE IF NOT EXISTS availability ("+
    "id INTEGER PRIMARY KEY, " +
    "item_id INTEGER NOT NULL, " +
    "next_week TEXT NOT NULL, " +
    "full_list TEXT NOT NULL, " +
    "unitsavailable INTEGER NOT NULL, " +
    "FOREIGN KEY (item_id) REFERENCES items(id)" + 
  ");");

});


