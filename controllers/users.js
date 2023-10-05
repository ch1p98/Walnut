const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
require("dotenv").config();
const db = require("../service/db");

const saltRound = process.env.SALTROUND;

const {
  getUserByEmail,
  getUserByUserName,
  createUser,
} = require("../model/user_model");

const userSignUp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const emailUsed = await getUserByEmail(email);
  if (emailUsed) {
    return res
      .status(403)
      .json({ success: false, message: "Email has been used." });
  }
  //insert user to MySQL
  const { name, username, country, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRound);
  console.log("hashedPassword: " + hashedPassword);

  const result = await createUser({
    name,
    username,
    email,
    country,
    hashedPassword,
  });
});

const userSignIn = asyncHandler(async (req, res) => {
  if (req.body.email) {
    const sql = "SELECT email, password FROM users WHERE email = ?;";
    const result = db.execute(sql, req.body.email);
    if (!result) {
      //compare password
      const password = result[0].password;
      const matched = await bcrypt.compare(password, req.body.password);
      if (!matched) {
        res.send("Incorrect email or password.");
      } else {
        res.send("Logged in.");
      }
    }
  } else if (req.body.username) {
    const sql = "SELECT username, password FROM users WHERE username = ?;";
    const result = db.execute(sql, req.body.username);
    if (result.length !== 0) {
      //compare password
      const password = result[0].password;
      const matched = await bcrypt.compare(password, req.body.password);
      if (!matched) {
        res.send("Incorrect email or password.");
      } else {
        res.send("Logged in.");
      }
    }
  }
});

const userProfile = asyncHandler(async (req, res) => {
  res.send("User Profile");
});

module.exports = {
  userSignUp,
  userSignIn,
  userProfile,
};
