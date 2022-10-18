const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db");

db.run(
  `CREATE TABLE users (
      name TEXT PRIMARY KEY NOT NULL,
      active BOOLEAN DEFAULT FALSE
    )`,
  (err) => {
    if (err) {
      console.log(err.message);
    }
  }
);

module.exports = db;
