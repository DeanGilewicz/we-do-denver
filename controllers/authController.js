const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const crypto = require("crypto");
const { promisify } = require("es6-promisify");
const mail = require("../handlers/mail");

// take advantage of some of the middleware that comes with passport
exports.login = passport.authenticate("local", {
	failureRedirect: "/login",
	failureFlash: "Failed Login!",
	successRedirect: "/places",
	successFlash: "You are now logged in!",
});

exports.logout = (req, res, next) => {
	req.logout(function(err) {
		if (err) {
			return next(err);
		}
		req.flash("success", "You are now logged out!");
		res.redirect("/");
	});
};

exports.isLoggedIn = (req, res, next) => {
	// check if user is authenticated
	if (req.isAuthenticated()) {
		next(); // user logged in
		return;
	}
	req.flash("error", "Oops! You must be logged in!");
	res.redirect("/login");
};

exports.forgot = async (req, res) => {
	// see if user with email address exists
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		// console.log('no user!');
		req.flash("error", "A password reset has been mailed to you.");
		return res.redirect("/login");
	}
	// set reset token and expiry on account
	user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
	user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
	await user.save();
	// send an email with the token
	const resetUrl = `http://${req.headers.host}/account/reset/${
		user.resetPasswordToken
	}`;
	await mail.send({
		user,
		subject: "Password Reset",
		resetUrl,
		filename: "password-reset",
	});
	req.flash("success", "You have been emailed a password reset link.");
	// redirect to login page
	res.redirect("/login");
};

exports.registerEmail = async (req, res, next) => {
	const name = req.body.name;
	const email = req.body.email;
	const user = { name, email };
	// console.log(user);
	if (!name || !email) {
		// don't send email just continue
		next();
	}
	await mail.send({
		user,
		subject: "Welcome to We Do Denver!",
		filename: "confirm-register",
	});
	next();
};

exports.reset = async (req, res) => {
	// check if a user has this token (and token hasn't expired)
	const user = await User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: { $gt: Date.now() },
	});
	if (!user) {
		req.flash("error", "Password reset token is invalid or expired.");
		return res.redirect("/login");
	}
	// if there is a user - show reset password form
	res.render("user/reset-password", { pageTitle: "Reset Password" });
};

exports.confirmedPasswords = (req, res, next) => {
	if (req.body.password === req.body["password-confirm"]) {
		return next();
	}
	req.flash("error", "Passwords do not match!");
	res.redirect("back");
};

exports.updatePassword = async (req, res) => {
	// check if a user has this token (and token hasn't expired)
	const user = await User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: { $gt: Date.now() },
	});
	if (!user) {
		req.flash("error", "Password reset token is invalid or expired.");
		return res.redirect("/login");
	}
	// update user's password - method made available through plugin in the model (User.js)
	const setPassword = promisify(user.setPassword, user);
	await setPassword(req.body.password);
	// remove fields on user (set to undefined in MongoDB)
	user.resetPasswordToken = undefined;
	user.resetPasswordExpires = undefined;
	const updatedUser = await user.save();
	// auto login user - using passport.js login method
	await req.login(updatedUser);
	req.flash("success", "Your password has been reset.");
	res.redirect("/");
};
