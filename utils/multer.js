const multer = require("multer");
const path = require("path");

require("dotenv").config();

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images accepted."), false);
  }
};
const limits = {
  fieldNameSize: 1000000,
  fieldNameSize: 255,
  files: 10,
};

const upload = multer({ dest: "uploads/", fileFilter, limits: limits });
const includeImage = (req, res, next) => {
  console.log(req.file);
  try {
    if (req.file.originalname === undefined) {
      throw new Error("Image can not be empty");
    }
  } catch (err) {
    console.log("Error:", err);
  }
  next();
};
module.exports = { upload, includeImage };
