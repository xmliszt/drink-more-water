// Sample server that serves direct HTML
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

// Create server
const app = express();
// app.use(cors({ origin: "http://localhost:8081" }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("short"));

// Health check
app.get("/health", (req, res) => {
  res.send({
    message: "hello",
  });
});

// Connect routers
const userRouter = require("./routers/userRouter");
const recordRouter = require("./routers/recordRouter");
app.use("/api/user", userRouter);
app.use("/api/record", recordRouter);

// Start listening
const port = process.env.PORT;
const host = process.env.HOST;
app.listen(port, host, () => {
  console.log(
    `${process.env.NODE_ENV.toUpperCase()} Server is running on http://${host}:${port}`
  );
});
