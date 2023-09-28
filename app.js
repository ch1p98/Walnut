const path = require("path");
const express = require("express");
const url = require("url");
const fs = require("fs");
const { morning, evening, night, day } = require("./utils");

const app = express();
const port = 3000;

let foo = () => {
  console.log("foo!");
  morning("Nashville");
  evening("Knoxville");
  night("DC");
  day("Irvine");
};
//foo();

app.get("/", (req, res) => {
  res.send("Hello, Express and MySQL!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
