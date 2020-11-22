const router = require("express").Router();
const path = require("path");
const mongoose = require("mongoose");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const shortid = require("shortid");
const bcrypt = require("bcrypt");

//@route - '/forgotpassword'
//@method - 'GET'
router.get("/", (req, res) => {
  res.render(path.join(__dirname, "../", "/views/forgotpassword"));
});

router.post("/", async (req, res) => {
  let email = req.body.femail;
  let user = await User.findOne({ email });
  if (user) {
    let newPassword = shortid.generate();
    user.password = bcrypt.hashSync(newPassword, 10);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD,
      },
    });
    let mailOptions = {
      from: process.env.MAIL,
      to: email,
      subject: 'New password for your "YouForever" account',
      text: `You have requested a password reset for your YouForever account, New Password = ${newPassword} ${"\n"} Login with the new password and you can change your password in your Dashboard. If you didn't make this request, ignore this email.`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent");
        user.save();
        res.render(path.join(__dirname, "../", "/views/login"), {
          message: "new password has been sent to your email",
          data: "",
        });
      }
    });
  } else {
    res.render(path.join(__dirname, "../", "/views/register"), {
      message: "No User with that email",
      data: "",
    });
  }
});

module.exports = router;
