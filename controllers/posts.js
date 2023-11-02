const asyncHandler = require("express-async-handler");
const {
  updateProductImage,
  updateProductImages,
} = require("../model/post_model");

const createPost = asyncHandler(async (req, res) => {});

const createImage = asyncHandler(async (req, res) => {
  const { postID } = req.body;
  const filename = req.file.key;
  const changeRows = await updateProductImage(postID, filename);
  if (changeRows === 0) {
    res.status(200).json({ success: true, message: "postID not exist" });
  } else {
    res
      .status(201)
      .json({ success: true, message: "Create image successifully" });
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
