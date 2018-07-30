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
	owner: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: 'You must supply an owner!'
	},
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
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	},
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

// Define our indexes - which fields
placeSchema.index({
	name: 'text',
	rating: 'text',
	cost: 'text'
});

placeSchema.pre('save', async function(next) {
	// rating
	if( typeof this.rating !== "undefined" && typeof this.visits !== "undefined" ) {
		if( this.isModified('visits.rating') ) {
			// calculate rating since something has changed
			const ratingTotal = this.visits.reduce((sV, cV) => ({rating: parseInt(sV.rating,10) + parseInt(cV.rating,10)}));
			// get average
			const totalVisits = this.visits.length;
			const aveRating = (ratingTotal.rating / totalVisits).toFixed(2);
			// console.log('ratingTotal', ratingTotal);
			// console.log('totalVisits', totalVisits);
			// console.log('aveRating', aveRating);
			this.rating = aveRating;
		}
	} else {
		// blank so set it to "-"
		this.rating = "-";
	}

	// cost
	if( typeof this.cost !== "undefined" && typeof this.visits !== "undefined" ) {
		if( this.isModified('visits.cost') ) {
			// calculate rating since something has changed
			const costTotal = this.visits.reduce((sV, cV) => ({cost: parseInt(sV.cost,10) + parseInt(cV.cost,10)}));
			// get average
			const totalVisits = this.visits.length;
			const aveCost = (costTotal.cost / totalVisits).toFixed(2);
			// console.log('costTotal', costTotal);
			// console.log('totalVisits', totalVisits);
			// console.log('aveCost', aveCost);
			this.cost = aveCost;
		}
	} else {
		// blank so set it to "-"
		this.cost = "-";
	}

	// name and slug
	if( this.isModified('name') ) {
		// console.log("NAME IS MODIFIED");
		this.slug = slug(this.name);
		const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
		const placesWithSlug = await this.constructor.find({ slug: slugRegEx });
		if( placesWithSlug.length ) {
			this.slug = `${this.slug}-${placesWithSlug.length + 1}`;
		}
	} else if( !this.isModified('name') && typeof this.slug === 'undefined') {
		// initially set the slug
		this.slug = slug(this.name);
		// console.log("NAME NOT MODIFIED");
	}

	// category name, category slug, category icon - TODO: make sure slugs are unique
	if( this.isModified('category.name') ) {
		this.category.slug = slug(this.category.name);
		this.category.icon = categoryIcons[this.category.name];
	} else if( !this.isModified('category.name') && typeof this.category.name === 'undefined') {
		// initially set the category slug and category icon
		this.category.slug = slug(this.category.name);
		this.category.icon = categoryIcons[this.category.name];
	}

	next();
});

placeSchema.pre('findOneAndUpdate', function(next) {
	// need to update slug automatically if name is modified
	if( this.getUpdate().name ) {
		this.findOneAndUpdate({}, { $set: { slug: slug(this.getUpdate().name) } });
	}
	next();
});

placeSchema.statics.getTagsList = function() {
	return this.aggregate([
		{ $unwind: "$tags" },
		{ $group: { _id: "$tags", count: { $sum: 1 } } },
		{ $sort: { count: -1 } }
    ]).cursor({}).exec().toArray();
};

module.exports = mongoose.model('Place', placeSchema);

