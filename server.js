//Environmental Variables
require("dotenv").config();
let PORT = process.env.PORT || 3000;
let SESSION_SECRET = process.env.SESSION_SECRET;
let ADMIN_SECRET = process.env.ADMIN_SECRET;

//Express Initialization
const express = require("express");
const app = express();

//Required Packages
const session = require("express-session"); // Sessions
// const morgan = require("morgan"); //Request Logging
// const cors = require("cors");
const MongoStore = require("connect-mongo")(session);
const helmet = require("helmet"); //Basic Security
// const yup = require("yup"); //Form Validation
let flash = require("connect-flash");
let mongoose = require("mongoose");

//Passport - Authentication and Authorization
const passport = require("passport");
require("./config/passport")(passport);
//Setting the view engine
app.set("view engine", "ejs");

//Express static server to load assets
app.use(express.static(__dirname + "/assets"));

//Express Middlewares
app.use(express.json()); //to work with JSON objects
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(helmet());
// app.use(morgan("tiny"));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//Database Connection
const connectDB = require("./config/db");
connectDB();

//Routes
app.use("/", require(__dirname + "/routes/index.js"));
app.use("/register", require(__dirname + "/routes/register.js"));
app.use("/login", require(__dirname + "/routes/login.js"));
app.use("/dashboard", require(__dirname + "/routes/dashboard.js"));
app.use("/logout", require(__dirname + "/routes/logout.js"));
app.use("/forgotpassword", require(__dirname + "/routes/forgotpassword.js"));
app.use("/editinfo", require(__dirname + "/routes/editinfo.js"));
app.use("/feepayment", require(__dirname + "/routes/feepayment.js"));
app.use("/changepassword", require(__dirname + "/routes/changepassword.js"));
app.use("/callback", require(__dirname + "/routes/callback.js"));
app.use("/adminlogin", require(__dirname + "/routes/adminlogin.js"));

app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`));
