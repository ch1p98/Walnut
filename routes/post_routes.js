const express = require("express");
const router = express.Router();
const {
  getPostsById,
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
  upload.array("images", 5),
  validNumber("postID"),
  createImages
);

router.get("/", (req, res) => {
  if (req.query.id !== "") {
    //try geting post from db
    getPostsById(req.params.id);
  } else {
    res.send("Id cannot be empty.");
  }
});

module.exports = router;
