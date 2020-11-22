const router = require("express").Router();

//@route - '/callback'
//@method - 'POST'
router.post("/", (req, res) => {
  res.redirect("/login");
});

module.exports = router;
