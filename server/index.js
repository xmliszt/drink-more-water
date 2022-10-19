// Sample server that serves direct HTML
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

// Create server
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check
app.get("/health", (req, res) => {
  res.send({
    message: "hello",
  });
});

// Connect routers
const userRouter = require("./routers/userRouter");
const recordRouter = require("./routers/recordRouter");
app.use("/user", userRouter);
app.use("/record", recordRouter);

// Start listening
const port = process.env.PORT;
const host = process.env.HOST;
app.listen(port, host, () => {
  console.log(
    `${process.env.NODE_ENV.toUpperCase()} Server is running on http://${host}:${port}`
  );
});
