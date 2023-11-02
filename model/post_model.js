const db = require("../service/db");

const insertIntoPost = async (data) => {
  const { title, content } = data;
  const sql = "INSERT INTO posts (title, content, likes) VALUES (?, ?, 1)";
  await db.execute(sql, [title, content]);
};

const getListOfPost = async (data) => {
  const { channel } = data;
  const sql = `SELECT * FROM posts p JOIN post_tags ON p.post_id = post_tags.post_id 
    JOIN tags ON post_tags.tag_id = tags.tag_id WHERE tags.name = ?`;

  try {
    const result = await db.execute(sql, [channel]);
    return result;
  } catch (err) {
    return err;
  }
};

const getPostById = async (postID) => {};
const getPostsByUser = async (userID) => {
  const sql =
    "SELECT file_path FROM image_post WHERE post_id IN (SELECT post_id FROM posts WHERE user_id = ?)";
  const response = await db.execute(sql, userID);
  return response;
};

const insertPostImage = async (postID, filename) => {
  const sql = "INSERT INTO image_post (post_id, file_path) VALUES (?, ?)";
  const response = await db.execute(sql, [postID, filename]);
  console.log("response:", response);
  const changedRows = response.changedRows;
  return changedRows;
};

const insertPostImages = async (postID, filenames) => {
  let sql = "INSERT INTO image_post (file_path, post_id) VALUES";
  const len = filenames.length;
  for (let i = 0; i < len; i++) {
    sql += " (?, ?),";
  }
  sql = sql.slice(0, -1);
  const preSta = filenames.reduce(
    (accu, curVal) => [...accu, curVal, postID],
    []
  );
  console.log("preSta:", preSta);
  const response = await db.execute(sql, preSta);
  return response;
};

module.exports = {
  getPostById,
  getPostsByUser,
  getListOfPost,
  insertIntoPost,
  insertPostImage,
  insertPostImages,
};
