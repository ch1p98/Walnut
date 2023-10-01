require("dotenv").config();
const path = require("path");
const url = require("url");
const fs = require("fs");
const { morning, evening, night, day } = require("./utils");
const express = require("express");
const app = express();

const port = 3000;

//foo();

app.get("/params/:sex", (req, res) => {
  res.send("res.params is " + req.params.sex);
});

app.get("/query", (req, res) => {
  res.send(
    "res.query name is " +
      req.query.name +
      " and res.query id is" +
      req.query.id +
      " and is req.body:" +
      req.body
  );
});

app.get("/search/:query?", (req, res) => {
  const query = req.params.query || "default";
  console.log("query:" + query);
  res.status(200).send("ok, " + "query:" + query);
  // 如果提供了查询参数，将使用它，否则使用默认值 'default'
});

app.get("/", (req, res) => {
  res.send("Hello, Express and MySQL!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
