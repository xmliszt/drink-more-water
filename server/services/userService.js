const db = require("../database/db");

// CREATE
async function createUser(name, password) {
  return new Promise((res, rej) => {
    db.run(
      `INSERT INTO users (name, password, active) VALUES (?,?,?)`,
      [name, password, false],
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
      `UPDATE users SET active = ? WHERE name = ? `,
      [active, name],
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

async function getAllUsers() {
  return new Promise((res, rej) => {
    db.all(`SELECT * FROM users`, (err, users) => {
      if (err) {
        rej(err);
      } else {
        users.map((user) => {
          user.password = "******";
          return user;
        });
        res(users);
      }
    });
  });
}

module.exports = {
  createUser,
  setUserActive,
  getUserByName,
  deleteUserByName,
  getAllUsers,
};
