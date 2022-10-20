const db = require("../database/db");
const moment = require("moment");
const { getUserByName } = require("./userService");

async function createRecord(name) {
  return new Promise((res, rej) => {
    let createdOn = moment().format("YYYYMMDD");
    db.run(
      `INSERT INTO record (id, username, created_on) VALUES (?,?,?)`,
      [null, name, createdOn],
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
    db.all(`SELECT * from record WHERE username = ?`, [name], (err, rows) => {
      if (err) {
        rej(err);
      } else {
        res(rows);
      }
    });
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

async function getTotalVolumeByCurrentDay(name) {
  return new Promise((res, rej) => {
    let today = moment().format("YYYYMMDD");
    db.get(
      `SELECT COUNT(*) FROM record WHERE created_on = ? AND username = ?`,
      [Number(today), name],
      (err, row) => {
        if (err) {
          rej(err);
        } else {
          let count = row["COUNT(*)"];
          getUserByName(name)
            .then((user) => {
              let volume = user.volume;
              res(count * volume);
            })
            .catch((err) => rej(err));
        }
      }
    );
  });
}

module.exports = {
  createRecord,
  getRecordByID,
  getRecordsByName,
  getAllRecords,
  deleteRecordByID,
  getTotalVolumeByCurrentDay,
};
