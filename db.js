var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

// Ensure data directory exists
try
{
  fs.mkdirSync(app.locals.config.data_dir);
}
catch (e)
{
  // Do nothing on error
}

/**
 * Setup our database for application wide usage
 **/
module.exports = function(app) {
  var db = new sqlite3.Database(app.locals.config.data_dir + 'inventory.db');

  db.run("PRAGMA foreign_keys = ON;");

  // Create the database schema (if not already existing)
  app.locals.db = db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS classifications ("+
      "id INTEGER PRIMARY KEY , " +
      "name TEXT UNIQUE , " +
      "parent_id INTEGER DEFAULT NULL" +
    ");");

    db.run("CREATE TABLE IF NOT EXISTS growers ("+
      "id INTEGER PRIMARY KEY, " +
      "first_name TEXT NOT NULL, " +
      "last_name TEXT, " +
      "email TEXT, " +
      "phone_number TEXT, " +
      "web_page TEXT" +
    ");");

    db.run("CREATE TABLE IF NOT EXISTS items ("+
      "id INTEGER PRIMARY KEY, " +
      "classification_id INTEGER NOT NULL UNIQUE, " +
      "grower TEXT, " +
      "price INTEGER DEFAULT 0, " +
      "unit TEXT, " +
      "unitsavailable INTEGER DEFAULT 0, " +
      "available_next_week TEXT NOT NULL DEFAULT 'n', " +
      "full_list TEXT NOT NULL DEFAULT 'y', " +
      "FOREIGN KEY (classification_id) REFERENCES classifications(id)" + 
    ");");

    db.run("CREATE TABLE IF NOT EXISTS photos ("+
      "id INTEGER PRIMARY KEY, " +
      "photo_name TEXT UNIQUE " +
    ");");

  	db.run("CREATE TABLE IF NOT EXISTS classification_photo (" +
      "classification_id INTEGER UNIQUE," + 
      "photo_id INTEGER," + 
      "FOREIGN KEY (classification_id) REFERENCES classifications(id)," + 
      "FOREIGN KEY (photo_id) REFERENCES photos(id)" +
    ");");

    db.run("CREATE TABLE IF NOT EXISTS top_level_order ("+
      "id INTEGER PRIMARY KEY, " +
      "classification_id INTEGER NOT NULL UNIQUE, " +
      "level_order INTEGER," + 
      "FOREIGN KEY (classification_id) REFERENCES classifications(id)" +
    ");");

  });
};


