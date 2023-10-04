const { getListOfPost } = require("../model/post_model");

const getHomePage = async (req, res) => {
  const { keyword } = req.query;
  let posts = {};
  let channel;
  if (!keyword) {
    channel = "人生";
  }
  posts = await getListOfPost({ channel });
  res.send({ posts });
};

module.exports = {
  getHomePage,
};
