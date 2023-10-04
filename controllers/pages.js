const { getListOfPost } = require("../model/post_model");

const getHomePage = async (req, res) => {
  const { keyword } = req.query;
  let posts = {};
  let channel;
  console.log(keyword);
  console.log("keyword is false: " + !keyword);
  if (!keyword) {
    channel = "人生";
  } else {
    channel = keyword;
  }
  posts = await getListOfPost({ channel });
  res.send({ posts });
};

module.exports = {
  getHomePage,
};
