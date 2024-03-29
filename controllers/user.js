const mongoose = require("mongoose");
const User = mongoose.model("User");
const { promisify } = require("es6-promisify");

exports.login = (req, res) => {
	res.render("user/login", { pageTitle: "Login" });
};

exports.register = (req, res) => {
	res.render("user/register", { pageTitle: "Register" });
};

exports.account = (req, res) => {
	res.render("user/account", { pageTitle: "My Account" });
};

exports.forgotPassword = (req, res) => {
	res.render("user/forgot-password", { pageTitle: "Forgot Password" });
};

exports.updateAccount = async (req, res) => {
	const updates = {
		name: req.body.name,
		email: req.body.email,
	};
	const user = await User.findOneAndUpdate(
		{ _id: req.user._id },
		{ $set: updates },
		{ new: true, runValidators: true, context: "query" }
	);
	req.flash("success", "Your account has been updated!");
	res.redirect("back");
};

exports.validateRegister = (req, res, next) => {
	req.sanitizeBody("name");
	req.checkBody("name", "You must supply a name!").notEmpty();
	req.checkBody("email", "Email is not valid").isEmail();
	req.sanitizeBody("email").normalizeEmail({
		remove_dots: false,
		remove_extension: false,
		gmail_remove_subaddress: false,
	});
	req.checkBody("password", "Password cannot be empty!").notEmpty();
	req
		.checkBody("password-confirm", "Confirm Password cannot be empty!")
		.notEmpty();
	req
		.checkBody("password-confirm", "Oops! Your passwords do not match!")
		.equals(req.body.password);

	const errors = req.validationErrors();
	if (errors) {
		req.flash(
			"error",
			errors.map((err) => err.msg)
		);
		res.render("user/register", { body: req.body, flashes: req.flash() }); // explicitly pass flashes since happening on same request
		return; // stop
	}
	next(); // no errors so onwards we go
};

exports.createUser = async (req, res, next) => {
	const { email, name, password } = req.body;
	const user = new User({ email, name });
	// callback based function so transforming to promise based function
	// method promisfying lives on an object so need to pass this object (User) as second param
	const register = promisify(User.register, User);
	// will store a password hash in db
	await register(user, password);
	next();
};
