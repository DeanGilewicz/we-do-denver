const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const placeSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: 'Please enter a place name!'
	},
	address: {
		type: String,
		trim: true
	},
	distance: String,
	img: String,
	category: {
		icon: {
			type: String,
			trim: true
		},
		name: {
			type: String,
			trim: true,
			required: 'Please enter a category name!'
		},
		slug: String
	},
	tags: [String],
	rating: String,
	cost: String,
	visits: [{
		cost: {
			type: String,
			trim: true,
			required: 'Please enter a cost rating!'
		},
		rating: {
			type: String,
			trim: true,
			required: 'Please enter a score rating!'
		},
		comment: {
			type: String,
			trim: true
		}
	}]
});

placeSchema.pre('save', function(next) {
	if( !this.isModified('name') ) {
		next();
		return;
		// TODO: make sure slugs are unique
	}
	this.slug = slug(this.name);
	next();
});

module.exports = mongoose.model('Place', placeSchema);

