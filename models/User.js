const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema ({
	name: {
		type: String,
		trim: true,
		required: 'Please enter your name'
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		validate: [validator.isEmail,'Invalid Email Address'],
		required: 'Please enter an email address'
	}
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' }); // has a .register method
userSchema.plugin(mongodbErrorHandler); // better error for unique property

module.exports = mongoose.model('User', userSchema);