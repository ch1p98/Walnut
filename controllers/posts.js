const asyncHandler = require("express-async-handler");
const {
  insertPostImage,
  insertPostImages,
  insertPost,
} = require("../model/post_model");

const createPost = asyncHandler(async (req, res, next) => {
  //write post to db
  const title = req.body.title;
  const content = req.body.content;
  const userID = req.cookies.userID;
  const { insertId } = await insertPost(userID, title, content);
  if (insertId !== "") {
    req.body.postID = insertId;
    console.log("insertId: ", insertId);
    next();
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Post not created." });
  }
  //req.body.postID = got postID
});

const createImage = asyncHandler(async (req, res) => {
  let { postID } = req.body;
  const filename = req.file.filename;
  console.log("req.file:", req.file);
  if (postID == "") postID = 1;
  console.log("postID:", postID);

  const { insertId } = await insertPostImage(postID, filename);
  if (!insertId) {
    res.status(200).json({ success: false, message: "postID not exist" });
  } else {
    res.status(201).json({
      success: true,
      message: "Create image successifully",
      insertId: insertId,
    });
  }
});

const createImages = asyncHandler(async (req, res) => {
  let { postID } = req.body;
  console.log("req.files:", req.files);
  const filename = req.files.reduce(
    (accu, file) => [...accu, file.filename],
    []
  );
  if (postID == "") postID = 1;
  console.log("postID:", postID);
  const response = await insertPostImages(postID, filename);

  console.log("response:", response);
  if (response) {
    res.status(201).json({ status: "Upload is complete." });
  } else {
    res.status(200).json({ status: "Upload is not complete." });
  }
});

module.exports = { createPost, createImage, createImages };
