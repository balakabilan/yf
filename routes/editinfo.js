const router = require("express").Router();
const path = require("path");
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

//@route - '/editinfo'
//@method - 'GET'
router.get("/", checkAuth, async (req, res) => {
  let user = await User.findOne({ id: req.user });
  res.render(path.join(__dirname, "../", "/views/editinfo"), {
    user: user,
    message: "",
  });
});

//@route - '/editinfo'
//@method - 'POST'
router.post("/", checkAuth, async (req, res) => {
  let user = await User.findOne({ id: req.user });
  user.name = req.body.editname;
  user.weight = req.body.editweight;
  user.age = req.body.editage;
  user.phone = req.body.editphone;
  user.height = req.body.editheight;
  user.address = req.body.editaddress;
  user.pincode = req.body.editpincode;
  user.save();
  res.render(path.join(__dirname, "../", "/views/editinfo"), {
    user: user,
    message: "Successfully Updated",
  });
});

module.exports = router;
