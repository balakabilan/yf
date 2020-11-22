const router = require("express").Router();
let shortid = require("shortid");
const path = require("path");
const User = require("../models/User");
const bcrypt = require("bcrypt");

//@route - '/register'
//@method - GET
router.get("/", (req, res) => {
  res.render(path.join(__dirname, "../", "/views/register"), {
    message: "",
  });
});

//@route - '/register'
//@method - POST
router.post("/", async (req, res) => {
  let hashedPassword = bcrypt.hashSync(req.body.password, 10);
  let emailUser = await User.findOne({ email: req.body.email });
  if (emailUser) {
    res.render(path.join(__dirname, "../", "/views/register"), {
      message: "Email Address is already registered.",
      data: "",
    });
  } else {
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      address: req.body.address,
      pincode: req.body.pincode,
      height: req.body.height,
      weight: req.body.weight,
      age: req.body.age,
      id: shortid.generate(),
    };
    let user = await User.create(newUser);
    if (user) {
      res.render(path.join(__dirname, "../", "/views/login"), {
        message: "Registration was successful. You can Login now",
        data: "",
      });
    } else {
      res.render(path.join(__dirname, "../", "/views/register"), {
        message: "Registration Failed",
        data: "",
      });
    }
  }
});

module.exports = router;
