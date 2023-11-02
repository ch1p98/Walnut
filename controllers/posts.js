const asyncHandler = require("express-async-handler");
const {
  updateProductImage,
  updateProductImages,
} = require("../model/post_model");

const createPost = asyncHandler(async (req, res) => {});

const createImage = asyncHandler(async (req, res) => {
  let { postID } = req.body;
  const filename = req.file.filename;
  console.log("req.file:", req.file);
  if (postID == "") postID = 1;
  console.log("postID:", postID);

  const { insertId } = await updateProductImage(postID, filename);
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
  const { postID } = req.body;
  console.log("req.files:", req.files);
  const filename = req.files.reduce((pas, file) => [...pas, file.key], []);
  console.log("filename:", filename);
  res.status(200).json({ status: "Upload is complete." });
});

module.exports = { createPost, createImage, createImages };
