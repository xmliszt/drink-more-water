const express = require("express");
const {
  createUser,
  getUserByName,
  deleteUserByName,
  setUserActive,
  getAllUsers,
} = require("../services/userService");
const router = express.Router();

// Create a user
router.post("/", (req, res) => {
  let name = req.body.name;
  let pwd = req.body.password;
  createUser(name, pwd)
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
router.put("/", (req, res) => {
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

module.exports = router;
