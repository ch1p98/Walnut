const db = require("../service/db");

const insertIntoPost = async (info) => {
  const { title, content } = info;
  const sql = "INSERT INTO posts (title, content, likes) VALUES (?, ?, 1)";
  await db.execute(sql, [title, content]);
};

module.exports = {
  getPost,
  insertIntoPost,
};
