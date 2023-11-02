const asyncHandler = require("express-async-handler");

const createPost = asyncHandler(async (req, res) => {});

const createImage = asyncHandler(async (req, res) => {
  const { productID } = req.body;
  const filename = req.file.key;
  const changeRows = await updateProductImage(productID, filename);
  if (changeRows === 0) {
    return res
      .status(200)
      .json({ success: true, message: "productID not exist" });
  }
  return res
    .status(201)
    .json({ success: true, message: "create image successifully" });
});

module.exports = { createPost, createImage };
