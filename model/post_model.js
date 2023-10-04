const db = require("../service/db");

const insertIntoPost = async (data) => {
  const { title, content } = data;
  const sql = "INSERT INTO posts (title, content, likes) VALUES (?, ?, 1)";
  await db.execute(sql, [title, content]);
};

const getListOfPost = async (data) => {
  const { keyword } = data;
  const sql = `SELECT * FROM posts p JOIN post_tags ON p.post_id = post_tags.post_id 
    JOIN tags ON post_tags.tag_id = tags.tag_id WHERE tags.name = ?`;
  const result = await db.execute(sql, [keyword]);
  return result;
};

module.exports = {
  getListOfPost,
  insertIntoPost,
};
