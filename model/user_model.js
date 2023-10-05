const db = require("../service/db");

const getUserByEmail = async (email) => {
  const sql = `SELECT user_id from users WHERE email = ?`;
  const result = db.execute(sql, email);
  if (!result) {
    const id = result[0];
    console.log(result);
    return id;
  } else {
    return null;
  }
};

const getUserByUserName = async (name) => {
  const sql = `SELECT user_id from users WHERE name = ?`;
  const result = db.execute(sql, name);
  if (!result) {
    const id = result[0];
    console.log(result);
    return id;
  } else {
    return null;
  }
};

const createUser = async ({
  name,
  username,
  email,
  country,
  hashedPassword,
}) => {
  const sql = `INSERT INTO users (name, username, email, country, password) VALUES (?, ?, ?, ?, ?)`;
  const result = await db.execute(sql, [
    name,
    username,
    email,
    country,
    hashedPassword,
  ]);
  console.log(result);
  const id = result.insertId;
  req.session.isVerified = true;
  req.session.user = {
    id,
    email,
    name,
    role: "user",
  };
  return res.status(200).json({
    data: {
      user: {
        id,
        name,
        username,
      },
    },
  });
};
module.exports = {
  getUserByEmail,
  getUserByUserName,
  createUser,
};
