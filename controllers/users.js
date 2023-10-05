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
  } else {
    //insert user to MySQL
    const { name, username, country, email, password } = req.body;
    const hashedPassword = bcrypt.hash(password, saltRound);

    const result = await createUser({
      name,
      username,
      email,
      country,
      hashedPassword,
    });
  }
});

const userSignIn = asyncHandler(
  async((req, res) => {
    if (req.body.email) {
      const sql = "SELECT email, password FROM users WHERE email = ?;";
      const result = db.execute(sql, req.body.email);
      if (result.length !== 0) {
        //compare password
        const password = result[0].password;
        if (!bcrypt.compare(password, req.body.password)) {
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
        if (!bcrypt.compare(password, req.body.password)) {
          res.send("Incorrect email or password.");
        } else {
          res.send("Logged in.");
        }
      }
    }
  })
);

module.exports = {
  userSignUp,
  userSignIn,
  userProfile,
};
