const router = require("express").Router();
const path = require("path");
const User = require("../models/User");
const bcrypt = require("bcrypt");

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

//@route - '/changepassword'
//@method - GET
router.get("/", checkAuth, async (req, res) => {
  res.render(path.join(__dirname, "../", "/views/changepassword"), {
    message: "",
  });
});

//@route - '/changepassword'
//@method - POST
router.post("/", checkAuth, async (req, res) => {
  let user = await User.findOne({ id: req.user });
  let oldPassword = req.body.oldpassword;
  let newPassword = req.body.newpassword;
  if (bcrypt.compareSync(oldPassword, user.password)) {
    user.password = bcrypt.hashSync(newPassword, 10);
    user.save();
    res.render(path.join(__dirname, "../", "/views/changepassword"), {
      message: "Successfully Changed",
    });
  } else {
    res.render(path.join(__dirname, "../", "/views/changepassword"), {
      message: "Incorrect Password",
    });
  }
});

module.exports = router;
