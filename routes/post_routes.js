const express = require("express");
const router = express.Router();
const {
  getPostByPostId,
  getPostsByUserId,
  getPostsByTopic,
  getPostsByKeyword,
} = require("../controllers/pages");
const { validNumber } = require("../utils/validator");

const {
  createPost,
  createImage,
  createImages,
} = require("../controllers/posts");
const { upload } = require("../utils/multer");

router.get("/channel/:topic", (req, res) => {
  if (req.params.topic) {
    getPostsByTopic(req.params.topic);
  } else {
    res.send("Topic cannot be empty.");
  }
});

router.get("/search", (req, res) => {
  if (req.query.keyword) {
    getPostsByKeyword(req.query.keyword);
  } else {
    res.send("Keyword cannot be empty.");
  }
});

router.post("/posts", createPost);

router.post(
  "/single",
  upload.single("image"),
  validNumber("postID"),
  createImage
);

router.post(
  "/multiple",
  upload.array("image", 10),
  validNumber("postID"),
  createImages
);

router.get("/user", (req, res) => {});

router.get("/", getPostByPostId);

module.exports = router;
