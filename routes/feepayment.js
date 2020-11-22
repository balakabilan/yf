const router = require("express").Router();
const path = require("path");
const User = require("../models/User");
const checkSum = require("../config/checkSum");
const PORT = process.env.PORT;
const passport = require("passport");
const shortid = require("shortid");

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

//@route = '/feepayment'
//@method = GET
router.get("/", checkAuth, async (req, res) => {
  let user = await User.findOne({ id: req.user });

  let params = {};
  params["MID"] = process.env.MID;
  params["WEBSITE"] = process.env.WEBSITE;
  params["CHANNEL_ID"] = "WEB";
  params["INDUSTRY_TYPE_ID"] = "Retail";
  params["ORDER_ID"] = shortid.generate();
  params["CUST_ID"] = user.id;
  params["TXN_AMOUNT"] = "100";
  params["CALLBACK_URL"] = `http://localhost:${PORT}/callback`;
  params["EMAIL"] = user.email;
  params["MOBILE_NO"] = user.phone;

  checkSum.genchecksum(params, process.env.KEY, function (err, cs) {
    if (err) throw err;
    let txn_url = "https://securegw-stage.paytm.in/order/process";
    let form_fields = "";
    for (x in params) {
      form_fields +=
        "<input type='hidden' name='" + x + "' value='" + params[x] + "'>";
    }
    form_fields += "<input type=hidden name='CHECKSUMHASH' value='" + cs + "'>";
    let html =
      '<html><body><center><h1>Please wait! Do not refresh the Page</h1></center><form action="' +
      txn_url +
      '" name="f1">' +
      form_fields +
      '</form><script src="/pay.js"></script></body></html>';
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    res.end();
  });
});

module.exports = router;
