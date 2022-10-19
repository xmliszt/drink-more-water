const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("db");

const createUserTable = `CREATE TABLE users (
  name string UNIQUE PRIMARY KEY NOT NULL,
  password string NOT NULL,
  active boolean
);`;

const createRecordTable = `CREATE TABLE record (
  id integer UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
  student_name string NOT NULL,
  created_on string NOT NULL,
  change integer DEFAULT 0,
  FOREIGN KEY (student_name) REFERENCES users (name)
);
`;

const createIndex = `CREATE INDEX record_index_0 ON record (student_name);`;

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
