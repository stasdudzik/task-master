const express = require("express");
const { generateToken } = require("@controllers/auth.controller");

const router = express.Router();

// Generate a new JWT token
router.post("/authorize", generateToken);

module.exports = router;
