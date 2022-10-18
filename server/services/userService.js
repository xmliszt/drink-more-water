const db = require("./db");

// CREATE
async function createUser(name) {
  return new Promise((res, rej) => {
    db.run(
      `INSERT INTO users (name, active) VALUES (?,?)`,
      [name, false],
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

async function setUserActive(name, active) {
  return new Promise((res, rej) => {
    db.run(
      `UPDATE users WHERE name = ? SET active = ?`,
      [name, active],
      (err) => {
        if (err) {
          rej(err);
        } else {
          getUserByName(name)
            .then((user) => {
              res(user);
            })
            .catch((err) => {
              rej(err);
            });
        }
      }
    );
  });
}

async function getUserByName(name) {
  return new Promise((res, rej) => {
    db.get(`SELECT * FROM users WHERE name = ?`, [name], (err, row) => {
      if (err) {
        rej(err);
      } else {
        res(row);
      }
    });
  });
}

async function deleteUserByName(name) {
  return new Promise((res, rej) => {
    db.run(`DELETE FROM users WHERE name = ?`, [name], (err) => {
      if (err) {
        rej(err);
      } else {
        res();
      }
    });
  });
}

module.exports = {
  createUser,
  setUserActive,
  getUserByName,
  deleteUserByName,
};
