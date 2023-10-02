const path = require("path");
const url = require("url");
const fs = require("fs");
// dummy example
const { morning, evening, night, day } = require("./utils");

const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();
console.log("process.env: " + process.env);

const app = express();
app.use(express.json());
app.set("view engine", "pug");
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    name: "sid",
    saveUninitialized: true,
    resave: false,
  })
);
app.use("/public", express.static("./public"));
app.use("/images", express.static("./images"));

const port = 3000;

// dummy middlewares
app.use("/user", (req, res, next) => {
  console.log(
    'this middleware is only working when the request is for "/user"'
  );
});

app.use((req, res, next) => {
  console.log(
    "this middleware will be working as long as the request goes here."
  );
});

//dummy routes
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
