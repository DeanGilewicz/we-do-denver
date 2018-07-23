const passport = require('passport');

// take advantage of some of the middleware that comes with passport
exports.login = passport.authenticate('local', {
	failureRedirect: '/login',
	failureFlash: 'Failed Login!',
	successRedirect: '/',
	successFlash: 'You are now logged in!'
});

exports.logout = (req, res) => {
	req.logout();
	req.flash('success', 'You are now logged out!');
	res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
	// check if user is authenticated
	if( req.isAuthenticated() ) {
		next(); // user logged in
		return;
	}
	req.flash('error', 'Oops! You must be logged in!');
	res.redirect('/login');
};