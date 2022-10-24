const db = require("../database/db");
const moment = require("moment");

// CREATE
async function createUser(name, password, volume, goal) {
  return new Promise((res, rej) => {
    db.run(
      `INSERT INTO users (name, password, volume, goal, point, last_point_updated) VALUES (?,?,?,?,?,?)`,
      [name, password, volume || 0, goal || 0, 0, null],
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

async function changeUserGoal(name, newGoal) {
  return new Promise((res, rej) => {
    db.run(
      `UPDATE users SET goal = ? WHERE name = ?`,
      [newGoal || 0, name],
      (err) => {
        if (err) {
          rej(err);
        } else {
          getUserByName(name)
            .then((user) => {
              user.password = "******";
              res(user);
            })
            .catch((err) => rej(err));
        }
      }
    );
  });
}

async function changeUserVolume(name, newVolume) {
  return new Promise((res, rej) => {
    db.run(
      `UPDATE users SET volume = ? WHERE name = ?`,
      [newVolume || 0, name],
      (err) => {
        if (err) {
          rej(err);
        } else {
          getUserByName(name)
            .then((user) => {
              user.password = "******";
              res(user);
            })
            .catch((err) => rej(err));
        }
      }
    );
  });
}

async function updatePoints(name, points) {
  return new Promise((res, rej) => {
    let updatedOn = moment().format("YYYYMMDD");
    db.run(
      `UPDATE users SET point = ?, last_point_updated = ? WHERE name = ?`,
      [points, updatedOn, name],
      (err) => {
        if (err) {
          rej(err);
        } else {
          getUserByName(name)
            .then((user) => {
              user.password = "******";
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

async function getRanks() {
  return new Promise(async (res, rej) => {
    try {
      let users = await getAllUsers();
      users.sort((a, b) => b.point - a.point);
      res(users);
    } catch (err) {
      rej(err);
    }
  });
}

module.exports = {
  createUser,
  getUserByName,
  deleteUserByName,
  getAllUsers,
  changeUserGoal,
  changeUserVolume,
  updatePoints,
  getRanks,
};
