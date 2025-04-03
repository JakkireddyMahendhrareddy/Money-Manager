const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "../database.db"), (err) => {
  if (err) console.error("Database connection failed:", err);
  else console.log("Connected to SQLite database");
});

module.exports = db;
