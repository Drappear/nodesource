const express = require("express");
const { renderMain, enterRoom, createRoom } = require("../controllers/page");

const router = express.Router();

router.get("/", renderMain);
router.get("/room", renderMain);
router.post("/room", createRoom);
router.get("/room/:id", enterRoom);

module.exports = router;
