// Modules
const express = require("express");
const app = express();
const baseRoutes = require("./routes/index");
const Handlebars = require("handlebars");
const handlebars = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");
const database = require("./config/database");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const favicon = require("serve-favicon");
const multer = require("multer");
require("./models/User");

// Session
app.use(
  session({
    secret: "myultrasecretsessionsecret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Midwares
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Handlebars
app.engine(
  "handlebars",
  handlebars({
    defaulLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");

// Mongoose
mongoose.Promise = global.Promise;
mongoose
  .connect(database.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongo Database");
  })
  .catch((err) => {
    console.log("Error to connecting to Mongo database: " + err);
  });

// Public
app.use(express.static(path.join(__dirname, "public")));

//Rotes
app.use("/", baseRoutes);

// HTTP error handling
app.use(function (req, res, next) {
  res.status(404).render("error/http/404");
});

// Others
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Running in " + PORT);
});
