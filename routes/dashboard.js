const router = require("express").Router();
const path = require("path");
const passport = require("passport");
const User = require("../models/User");

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    let data = req.flash("message")[0];
    res.render(path.join(__dirname, "../", "/views/login"), {
      message: "",
      data,
    });
  }
}

//@route - '/dashboard/:id'
//@method - GET

router.get("/:id", checkAuth, async (req, res) => {
  let user = await User.findOne({ id: req.user });
  res.render(path.join(__dirname, "../", "/views/dashboard"), {
    user,
  });
});

module.exports = router;
