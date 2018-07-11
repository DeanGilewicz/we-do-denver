const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');
const categoryIcons = {
	"Fuel Me" : 'http://via.placeholder.com/350x150?text=FuelMe',
	"Hike It" : 'http://via.placeholder.com/350x150?text=HikeIt',
	"Thirst Quenching" : 'http://via.placeholder.com/350x150?text=ThirstQuenching',
	"On The Slopes" : 'http://via.placeholder.com/350x150?text=OnTheSlopes',
	"Entertain Us" : 'http://via.placeholder.com/350x150?text=EntertainUs',
	"Shopping Bags" : 'http://via.placeholder.com/350x150?text=ShoppingBags'
};

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
	slug: String,
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
	if( !this.isModified('name') || !this.isModified('category.name') ) {
		next();
		return;
		// TODO: make sure slugs are unique
	} else if( this.isModified('name') && !this.isModified('category.name') ) {
		this.slug = slug(this.name);
	} else if( this.isModified('category.name') && !this.isModified('name') ) {
		this.category.slug = slug(this.category);
		this.category.icon = categoryIcons[this.category.name]
	} else {
		this.slug = slug(this.name);
		this.category.slug = slug(this.category.name);
		this.category.icon = categoryIcons[this.category.name];
	}
	next();
});

module.exports = mongoose.model('Place', placeSchema);

