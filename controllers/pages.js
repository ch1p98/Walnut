const {
  getListOfPost,
  getPostById,
  getPostsByUser,
} = require("../model/post_model");

const getHomePage = async (req, res) => {
  const { keyword } = req.query;
  let posts = {};
  let channel;
  console.log(keyword);
  console.log("keyword is false: " + !keyword);
  if (!keyword) {
    channel = "life";
  } else {
    channel = keyword;
  }
  posts = await getListOfPost({ channel });
  res.send({ posts });
};
const getPostsByUserId = async (req, res) => {
  if (req.query.id !== "") {
    const userID = req.query.id;
    const response = await getPostsByUser(userID);
    res.status(200).json(response);
  } else {
  }
};
const getPostByPostId = async (req, res) => {
  if (req.query.id !== "") {
    //try geting post from db
    const postID = req.query.id;
    console.log("postID:", postID);
    const response = await getPostById(postID);
    if (response.length !== 0) {
      res.status(201).json(response);
    } else {
      res.status(201).send("Post not existed or deleted.");
    }
  } else {
    res.send("Id cannot be empty.");
  }
};
const getPostsByTopic = async (req, res) => {};
const getPostsByKeyword = async (req, res) => {};
module.exports = {
  getHomePage,
  getPostsByUserId,
  getPostByPostId,
  getPostsByTopic,
  getPostsByKeyword,
};
