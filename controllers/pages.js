const { getPost } = require("../model/post_model");

const getHomePage = async (req, res) => {
  const { keyword } = req.query;
  let posts = {};
  let channel;
  if (!keyword) {
    channel = "trendy";
  }
  posts = await getPost({ channel });
};

module.exports = {
  getHomePage,
};
