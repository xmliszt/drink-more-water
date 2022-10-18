// Sample server that serves direct HTML
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.send({
    message: "hello",
  });
});

const userRouter = require("./routers/userRouter");

app.use("/user", userRouter);

const port = process.env.PORT
const host = process.env.HOST
app.listen(port, host, () => {
  console.log(
    `${process.env.NODE_ENV.toUpperCase()} Server is running on http://${host
    }:${port}`
  );
});
