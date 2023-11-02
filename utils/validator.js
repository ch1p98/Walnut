const { query, body, validationResult } = require("express-validator");

const collectError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((error) => error.msg);
    return res.status(400).json({ success: false, errors: errorMessage });
  }
  return next();
};

const validNumber = (variable, title = variable) =>
  body(variable)
    .trim()
    .isLength({ min: 1 })
    .withMessage(`${title} can not be empty`)
    .isNumeric()
    .withMessage(`${title} should be a number`)
    .isInt({ min: 0 })
    .withMessage(`${title} should be a postive integer`);

const validateEmail = (key) =>
  body(key)
    .trim()
    .notEmpty()
    .optional({ values: "null" })
    .isLength({ max: 255 })
    .isEmail()
    .normalizeEmail()
    .withMessage("Email is invalid!");

const validateName = (key) =>
  body(key)
    .trim()
    .notEmpty()
    .escape()
    .isLength({ max: 128 })
    .withMessage(`Input name: ${key} length exceeds 128!`);

const validateUserName = (key) =>
  body(key)
    .trim()
    .notEmpty()
    .escape()
    .isLength({ max: 128 })
    .withMessage(`Input name: ${key} length exceeds 128!`);

const validatePassword = (key) =>
  body(key)
    .optional({ nullable: true })
    .isLength({ min: 8 })
    .withMessage("At least 8 characters is requird!")
    .isLength({ max: 255 })
    .withMessage(`Input password: ${key} length exceeds 128!`)
    .matches(/[a-z]/)
    .withMessage("At least one lower case letter is requird")
    .matches(/[0-9]/)
    .withMessage("At least one number is requird");

const validateId = (key) =>
  query(key)
    .trim()
    .notEmpty()
    .escape()
    .withMessage(`${key} can not be empty`)
    .isInt({ min: 1 })
    .withMessage(`invalid ${key}`);

const jsonOnly = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    throw Error("Content-type should be application/json.");
  }
  next();
};

module.exports = {
  validNumber,
  validateEmail,
  validateName,
  validateUserName,
  validateId,
  validatePassword,
  collectError,
  jsonOnly,
};
