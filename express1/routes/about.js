const express = require("express");

// 라우터
const router = express.Router();

router.get("/", (req, res) => res.render("about"));

module.exports = router;
