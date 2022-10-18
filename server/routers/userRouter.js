const express = require("express");
const {
  createUser,
  getUserByName,
  deleteUserByName,
  setUserActive,
} = require("../services/userService");
const router = express.Router();

// Create a user
router.post("/", (req, res) => {
  let name = req.body.name;
  createUser(name)
    .then(() => {
      res.send({
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).json({
        success: false,
        error: err,
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
        error: err,
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
        error: err,
      });
    });
});

// Update a user's activeness status
router.put("/", (req, res) => {
  let name = req.query.name;
  let active = req.body.isActive;
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
        error: err,
      });
    });
});

module.exports = router;
