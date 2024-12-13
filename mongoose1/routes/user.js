var express = require("express");
var User = require("../schemas/user");

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      // req.body : form 안의 내용
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      console.log("user insert 결과 : ", user);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  });
module.exports = router;
