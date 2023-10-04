const express = require("express");
const router = express.Router();
const { getHomePage } = require("../controllers/pages");
router.get("/explore", getHomePage);
router.get("/", getHomePage);

module.exports = router;
