const passport = require("passport");
const router = require("express").Router();
const path = require("path");

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

//@route - '/login'
//@method - 'GET'
router.get("/", checkAuth, (req, res) => {
  res.redirect("/dashboard/" + req.user);
});

//@route - '/login'
//@method - 'POST'
router.post(
  "/",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  function (req, res) {
    res.redirect("/dashboard/" + req.user.id);
  }
);

module.exports = router;
