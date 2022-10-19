const db = require("../database/db");
const moment = require("moment");

async function createRecord(name, change) {
  return new Promise((res, rej) => {
    let createdOn = moment().format("MMMM Do YYYY, h:mm:ss a");
    db.run(
      `INSERT INTO record (id, student_name, created_on, change) VALUES (?,?,?,?)`,
      [null, name, createdOn, change],
      (err) => {
        if (err) {
          rej(err);
        } else {
          res();
        }
      }
    );
  });
}

async function getRecordByID(id) {
  return new Promise((res, rej) => {
    db.get(`SELECT * FROM record WHERE id = ? LIMIT 1`, [id], (err, row) => {
      if (err) {
        rej(err);
      } else {
        res(row);
      }
    });
  });
}

async function getRecordsByName(name) {
  return new Promise((res, rej) => {
    db.all(
      `SELECT * from record WHERE student_name = ?`,
      [name],
      (err, rows) => {
        if (err) {
          rej(err);
        } else {
          res(rows);
        }
      }
    );
  });
}

async function getAllRecords() {
  return new Promise((res, rej) => {
    db.all(`SELECT * from record`, (err, rows) => {
      if (err) {
        rej(err);
      } else {
        res(rows);
      }
    });
  });
}

async function deleteRecordByID(id) {
  return new Promise((res, rej) => {
    db.run(`DELETE FROM record WHERE id = ?`, [id], (err) => {
      if (err) {
        rej(err);
      } else {
        res();
      }
    });
  });
}

module.exports = {
  createRecord,
  getRecordByID,
  getRecordsByName,
  getAllRecords,
  deleteRecordByID,
};
