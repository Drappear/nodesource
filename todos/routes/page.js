// 경로만 지정
const express = require("express");
const {
  createGet,
  create,
  list,
  compList,
  read,
  update,
  remove,
  modify,
} = require("../controllers/page");

const router = express.Router();

router.get("/", list);
router.get("/todos", list);
router.get("/todos/completed/list", compList);

router.route("/todos/create").get(createGet).post(create);

router.get("/todos/:id", read);

// router.get("/todos/modify/:id", update);
// router.post("/todos/modify/:id", update);
router.route("/todos/modify/:id").get(read).post(update);

router.get("/todos/remove/:id", remove);

module.exports = router;
