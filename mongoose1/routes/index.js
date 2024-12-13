var express = require("express");
var User = require("../schemas/user");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    // db.user.find({}) : 전체 user 가져오기
    const users = await User.find({});
    // 템플릿, 데이터 전송
    res.render("user/user", { users: users });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
