const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("db");

const createUserTable = `CREATE TABLE users (
  name string UNIQUE PRIMARY KEY NOT NULL,
  password string,
  volume integer NOT NULL,
  goal integer NOT NULL,
  point integer NOT NULL,
  last_point_updated string
);`;

const createRecordTable = `CREATE TABLE record (
  id integer UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
  username string NOT NULL,
  created_on string NOT NULL,
  FOREIGN KEY (username) REFERENCES users (name) ON DELETE CASCADE
);
`;

const createIndex = `CREATE INDEX record_index_0 ON record (username);`;

db.serialize(() => {
  db.run(`PRAGMA foreign_keys = ON;`, (err) => {
    if (err) {
      console.log(err.message);
    }
  });
  db.run(createUserTable, (err) => {
    if (err) {
      console.log(err.message);
    }
  });
  db.run(createRecordTable, (err) => {
    if (err) {
      console.log(err.message);
    }
  });
  db.run(createIndex, (err) => {
    if (err) {
      console.log(err.message);
    }
  });
});

module.exports = db;
