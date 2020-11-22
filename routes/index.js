const path = require("path");
const express = require("express");
const router = express.Router();

//@route - '/'
//@method - GET
router.get("/", (req, res) => {
  res.render(path.join(__dirname, "../", "/views/index.ejs"));
});

module.exports = router;
