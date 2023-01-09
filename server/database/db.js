require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.PGURI,
  ssl: {},
});

const createUserTable = `CREATE TABLE IF NOT EXISTS users (
  name text UNIQUE PRIMARY KEY NOT NULL,
  password text,
  volume integer NOT NULL,
  goal integer NOT NULL,
  point integer NOT NULL,
  last_point_updated text
);`;

const createRecordTable = `CREATE TABLE IF NOT EXISTS record (
  id SERIAL PRIMARY KEY,
  username text NOT NULL,
  created_on text NOT NULL,
  FOREIGN KEY (username) REFERENCES users (name) ON DELETE CASCADE
);
`;

const createIndex = `CREATE INDEX IF NOT EXISTS record_index_0 ON record (username);`;

pool.connect().then(async () => {
  try {
    await pool.query(createUserTable);
    await pool.query(createRecordTable);
    await pool.query(createIndex);
  } catch (err) {
    console.log(err);
  }
});

module.exports = pool;
