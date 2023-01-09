const client = require("../database/db");
const moment = require("moment");

// CREATE
async function createUser(name, password, volume, goal) {
  return new Promise((res, rej) => {
    client.query(
      `INSERT INTO users (name, password, volume, goal, point, last_point_updated) VALUES ($1,$2,$3,$4,$5,$6)`,
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
    client.query(
      `SELECT * FROM users WHERE name = $1`,
      [name],
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

async function deleteUserByName(name) {
  return new Promise((res, rej) => {
    client.query(`DELETE FROM users WHERE name = $1`, [name], (err) => {
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
    client.query(`SELECT * FROM users`, (err, result) => {
      if (err) {
        rej(err);
      } else {
        result.rows.map((user) => {
          user.password = "******";
          return user;
        });
        res(result.rows);
      }
    });
  });
}

async function changeUserGoal(name, newGoal) {
  return new Promise((res, rej) => {
    client.query(
      `UPDATE users SET goal = $1 WHERE name = $2`,
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
    client.query(
      `UPDATE users SET volume = $1 WHERE name = $2`,
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
    client.query(
      `UPDATE users SET point = $1, last_point_updated = $2 WHERE name = $3`,
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
