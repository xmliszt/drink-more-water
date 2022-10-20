const express = require("express");
const {
  createRecord,
  getRecordByID,
  getAllRecords,
  getRecordsByName,
  deleteRecordByID,
  getTotalVolumeByCurrentDay,
} = require("../services/recordService");
const router = express.Router();

// Create a new record
router.post("/", (req, res) => {
  let name = req.body.name;
  createRecord(name)
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

// Get a record by ID
router.get("/", (req, res) => {
  let _id = req.query.id;
  getRecordByID(_id)
    .then((record) => {
      if (record) {
        res.send({
          success: true,
          record,
        });
      } else {
        res.status(404).json({
          success: false,
          error: "Record not found!",
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

// Get all records
router.get("/all", (req, res) => {
  let name = req.query.name;
  if (name) {
    getRecordsByName(name)
      .then((records) => {
        res.send({
          success: true,
          records,
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
  } else {
    getAllRecords()
      .then((records) => {
        res.send({
          success: true,
          records,
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
  }
});

// Delete a record by ID
router.delete("/", (req, res) => {
  let _id = req.query.id;
  deleteRecordByID(_id)
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

// Get the sum of volumes consumed by a user in a day
router.get("/volume", (req, res) => {
  let username = req.query.name;
  getTotalVolumeByCurrentDay(username)
    .then((volume) => {
      res.send({
        success: true,
        volume,
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
