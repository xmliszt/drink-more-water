const express = require("express");
const {
  createUser,
  getUserByName,
  deleteUserByName,
  setUserActive,
  getAllUsers,
  changeUserGoal,
  changeUserVolume,
  getRanks,
  updatePoints,
} = require("../services/userService");
const router = express.Router();

// Create a user
router.post("/", (req, res) => {
  let name = req.body.name;
  let pwd = req.body.password;
  let vol = req.body.volume;
  let goal = req.body.goal;
  getAllUsers()
    .then((users) => {
      let names = users.map((user) => user.name);
      if (names.includes(name)) {
        res.status(409).json({
          success: false,
          error: "User exists!",
        });
      } else {
        createUser(name, pwd, vol, goal)
          .then(() => {
            res.send({
              success: true,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(501).json({
              success: false,
              error: {
                ...err,
                message: err.message,
              },
            });
          });
      }
    })
    .catch((err) => {
      res.status(501).json({
        success: false,
        error: {
          ...err,
          message: err.message,
        },
      });
    });
});

// Get a user
router.get("/", (req, res) => {
  let name = req.query.name;

  getUserByName(name)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(501).json({
        success: false,
        error: {
          ...err,
          message: err.message,
        },
      });
    });
});

// Delete a user
router.delete("/", (req, res) => {
  let name = req.query.name;

  deleteUserByName(name)
    .then(() => {
      res.send({
        success: true,
      });
    })
    .catch((err) => {
      res.status(501).json({
        success: false,
        error: {
          ...err,
          message: err.message,
        },
      });
    });
});

// Update a user's activeness status
router.put("/active", (req, res) => {
  let name = req.body.name;
  let active = req.body.active;
  setUserActive(name, active)
    .then((user) => {
      res.send({
        success: true,
        user,
      });
    })
    .catch((err) => {
      res.status(501).json({
        success: false,
        error: {
          ...err,
          message: err.message,
        },
      });
    });
});

// Update a user's goal
router.put("/goal", (req, res) => {
  let name = req.body.name;
  let goal = req.body.goal;
  changeUserGoal(name, goal)
    .then((user) => {
      res.send({
        success: true,
        user,
      });
    })
    .catch((err) => {
      res.status(501).json({
        success: false,
        error: {
          ...err,
          message: err.message,
        },
      });
    });
});

// Update a user's volume
router.put("/volume", (req, res) => {
  let name = req.body.name;
  let volume = req.body.volume;
  changeUserVolume(name, volume)
    .then((user) => {
      res.send({
        success: true,
        user,
      });
    })
    .catch((err) => {
      res.status(501).json({
        success: false,
        error: {
          ...err,
          message: err.message,
        },
      });
    });
});

// Get all users
router.get("/all", (req, res) => {
  getAllUsers()
    .then((users) => {
      res.send({
        success: true,
        users,
      });
    })
    .catch((err) => {
      res.status(501).json({
        success: false,
        error: {
          ...err,
          message: err.message,
        },
      });
    });
});

// Update points for user
router.put("/point", (req, res) => {
  let name = req.body.name;
  let points = req.body.points;
  updatePoints(name, points)
    .then((user) => {
      res.send({
        success: true,
        user,
      });
    })
    .catch((err) => {
      res.status(501).json({
        success: false,
        error: {
          ...err,
          message: err.message,
        },
      });
    });
});

// Get the ranks
router.get("/rank", (req, res) => {
  getRanks()
    .then((ranks) => {
      res.send({
        success: true,
        rank: ranks,
      });
    })
    .catch((err) => {
      res.status(501).json({
        success: false,
        error: {
          ...err,
          message: err.message,
        },
      });
    });
});

module.exports = router;
