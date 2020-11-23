const router = require("express").Router();
const path = require("path");

//@route - '/adminlogin'
//@method - 'GET'

router.get("/", (req, res) => {
  res.render(path.join(__dirname, "../", "/views/adminlogin"), {
    message: "",
  });
});

router.post("/", (req, res) => {
  let email = req.body.adminemail;
  let password = req.body.adminpassword;

  if (email == process.env.ADMIN_EMAIL) {
    if (password == process.env.ADMIN_PASSWORD) {
      res.render(path.join(__dirname, "../", "/views/dashboard"), {
        message: "",
        user: {},
      });
    } else {
      res.render(path.join(__dirname, "../", "/views/adminlogin"), {
        message: "InCorrect Password",
      });
    }
  } else {
    res.render(path.join(__dirname, "../", "/views/adminlogin"), {
      message: "No Admin User found with that Email",
    });
  }
});

module.exports = router;
