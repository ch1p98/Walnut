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

const updateProductImage = async (postID, filename) => {
  const sql = "INSERT INTO image_post (post_id, file_path) VALUES (?, ?)";
  const response = await db.execute(sql, [postID, filename]);
  console.log("response:", response);
  const changedRows = response.changedRows;
  return changedRows;
};

const updateProductImages = async (productID, filenames) => {};

module.exports = {
  getListOfPost,
  insertIntoPost,
  updateProductImage,
  updateProductImages,
};
