const client = require("../database/db");
const moment = require("moment");
const { getUserByName } = require("./userService");

async function createRecord(name) {
  return new Promise((res, rej) => {
    let createdOn = moment().format("YYYYMMDD");
    client.query(
      `INSERT INTO record (username, created_on) VALUES ($1,$2)`,
      [name, createdOn],
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

async function getRecorclientyID(id) {
  return new Promise((res, rej) => {
    client.query(
      `SELECT * FROM record WHERE id = $1 LIMIT 1`,
      [id],
      (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(result.rows[0]);
        }
      }
    );
  });
}

async function getRecordsByName(name) {
  return new Promise((res, rej) => {
    client.query(
      `SELECT * from record WHERE username = $1`,
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
    client.query(`SELECT * from record`, (err, result) => {
      if (err) {
        rej(err);
      } else {
        res(result.rows);
      }
    });
  });
}

async function deleteRecorclientyID(id) {
  return new Promise((res, rej) => {
    client.query(`DELETE FROM record WHERE id = $1`, [id], (err) => {
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
    client.query(
      `SELECT COUNT(*) FROM record WHERE created_on = $1 AND username = $2`,
      [Number(today), name],
      (err, result) => {
        if (err) {
          rej(err);
        } else {
          let count = Number(result.rows[0].count);
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
  getRecorclientyID,
  getRecordsByName,
  getAllRecords,
  deleteRecorclientyID,
  getTotalVolumeByCurrentDay,
};
