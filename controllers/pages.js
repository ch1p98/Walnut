const { getListOfPost } = require("../model/post_model");

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
const getPostsById = async (req, res) => {};
const getPostsByTopic = async (req, res) => {};
const getPostsByKeyword = async (req, res) => {};
module.exports = {
  getHomePage,
  getPostsById,
  getPostsByTopic,
  getPostsByKeyword,
};
