const express = require("express");
const router = express.Router();
const {
  getPostsById,
  getPostsByTopic,
  getPostsByKeyword,
} = require("../controllers/pages");

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

router.get("/", (req, res) => {
  if (req.query.id !== "") {
    //try geting post from db
    getPostsById(req.params.id);
  } else {
    res.send("Id cannot be empty.");
  }
});

module.exports = router;
