const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");

passport.use(User.createStrategy());

// what information would you like on each request
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
