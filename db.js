var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./data/inventory.db');

module.exports = db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS classifications ("+
      "id INTEGER PRIMARY KEY, " +
      "name TEXT NOT NULL, " +
      "parent_id INTEGER NOT NULL" +
      ");");

  db.run("CREATE TABLE IF NOT EXISTS growers ("+
      "id INTEGER PRIMARY KEY, " +
      "name TEXT NOT NULL, " +
      "email TEXT NOT NULL" +
      ");");

  db.run("CREATE TABLE IF NOT EXISTS items ("+
     "id INTEGER PRIMARY KEY, " +
     "classification_id INTEGER NOT NULL, " +
     "category TEXT NOT NULL" +
      ");");

});


