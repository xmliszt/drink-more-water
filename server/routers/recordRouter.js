const express = require("express");
const {
  createRecord,
  getRecordByID,
  getAllRecords,
  getRecordsByName,
  deleteRecordByID,
} = require("../services/recordService");
const router = express.Router();

router.post("/", (req, res) => {
  let name = req.body.name;
  let change = req.body.change;
  createRecord(name, change)
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

module.exports = router;
