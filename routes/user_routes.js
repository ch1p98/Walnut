const express = require("express");
const router = express.Router();
const { userSignUp, userSignIn, userProfile } = require("../controllers/users");
const {
  jsonOnly,
  validateEmail,
  validateName,
  validateUserName,
  validateId,
  validatePassword,
  collectError,
} = require("../utils/validator");

router.post(
  "/signup",
  [
    jsonOnly,
    validateEmail("email"),
    validateName("name"),
    validateUserName("username"),
    validatePassword("password"),
    collectError,
  ],
  userSignUp
);

router.post(
  "/signin",
  [validateEmail("email"), validatePassword("password"), collectError],
  userSignIn
);

router.get("/profile", [], userProfile);

module.exports = router;
