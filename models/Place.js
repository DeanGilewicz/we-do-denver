const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");
const categoryIcons = {
	"Fuel Me": "/images/icon-fuel-me.svg",
	"Hike It": "/images/icon-hike-it.svg",
	"Thirst Quenching": "/images/icon-thirst-quenching.svg",
	"On The Slopes": "/images/icon-on-the-slopes.svg",
	"Entertain Us": "/images/icon-entertain-us.svg",
	"Shopping Bags": "/images/icon-shopping-bags.svg",
};

const placeSchema = new mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: "You must supply an owner!",
		},
		name: {
			type: String,
			trim: true,
			required: "Please enter a place name!",
		},
		address: {
			type: String,
			trim: true,
		},
		distance: Number,
		img: String,
		category: {
			icon: {
				type: String,
				trim: true,
			},
			name: {
				type: String,
				trim: true,
				required: "Please enter a category name!",
			},
			slug: String,
		},
		slug: String,
		tags: [String],
		rating: Number,
		cost: Number,
		created: {
			type: Date,
			default: Date.now,
		},
		updated: {
			type: Date,
			default: Date.now,
		},
		visits: [
			{
				created: {
					type: Date,
					default: Date.now,
				},
				prettyCreated: {
					type: String,
					trim: true,
				},
				// updated: {
				// 	type: Date,
				// 	default: Date.now
				// },
				cost: {
					type: Number,
					trim: true,
					required: "Please enter a cost rating!",
				},
				rating: {
					type: Number,
					min: 1,
					max: 5,
				},
				comment: {
					type: String,
					trim: true,
				},
			},
		],
	},
	{
		usePushEach: true, // allows array.push to work correctly
	}
);

// Define our indexes - which fields
placeSchema.index({
	name: "text",
	rating: "number",
	cost: "number",
	distance: "number",
});

placeSchema.pre("save", async function (next) {
	// rating
	if (
		typeof this.rating !== "undefined" &&
		typeof this.visits !== "undefined"
	) {
		if (this.isModified("visits.rating")) {
			// calculate rating since something has changed
			const ratingTotal = this.visits.reduce((sV, cV) => ({
				rating: sV.rating + cV.rating,
			}));
			// get average
			const totalVisits = this.visits.length;
			const aveRating = (ratingTotal.rating / totalVisits).toFixed(2);
			this.rating = aveRating;
		}
	} else {
		// blank so set it to "-"
		this.rating = 0;
	}

	// cost
	if (typeof this.cost !== "undefined" && typeof this.visits !== "undefined") {
		if (this.isModified("visits.cost")) {
			// calculate rating since something has changed
			const costTotal = this.visits.reduce((sV, cV) => ({
				cost: sV.cost + cV.cost,
			}));
			// get average
			const totalVisits = this.visits.length;
			const aveCost = (costTotal.cost / totalVisits).toFixed(2);
			this.cost = aveCost;
		}
	} else {
		// blank so set it to "-"
		this.cost = 0;
	}

	// name and slug
	if (this.isModified("name")) {
		this.slug = slug(this.name);
		const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, "i");
		const placesWithSlug = await this.constructor.find({ slug: slugRegEx });
		if (placesWithSlug.length) {
			this.slug = `${this.slug}-${placesWithSlug.length + 1}`;
		}
	} else if (!this.isModified("name") && typeof this.slug === "undefined") {
		// initially set the slug
		this.slug = slug(this.name);
	}

	// category name, category slug, category icon - TODO: make sure slugs are unique
	if (this.isModified("category.name")) {
		this.category.slug = slug(this.category.name);
		this.category.icon = categoryIcons[this.category.name];
	} else if (
		!this.isModified("category.name") &&
		typeof this.category.name === "undefined"
	) {
		// initially set the category slug and category icon
		this.category.slug = slug(this.category.name);
		this.category.icon = categoryIcons[this.category.name];
	}

	next();
});

placeSchema.pre("findOneAndUpdate", function (next) {
	// need to update slug automatically if name is modified
	if (this.getUpdate().name) {
		this.findOneAndUpdate({}, { $set: { slug: slug(this.getUpdate().name) } });
	}
	next();
});

// placeSchema.statics.getTagsList = function() {
// return this
// .find({
// owner: {$eq: "5ba5d657e521d70af3874cd4"}
// })
// .aggregate([
// { $lookup: {
// 	from: "user",
// 	localField: "_id",
// 	foreignField: "owner",
// 	as: "link"
//    		}
// 	}
// { "$match" : {'owner._id': {$eq: "5ba5d657e521d70af3874cd4"}} }
// { $match : {'owner._id': "5ba5d657e521d70af3874cd4"} }
// { $unwind: "$tags" },
// { $group: { _id: "$tags", count: { $sum: 1 } } },
// { $sort: { count: -1 } }
// ]).cursor({}).exec().toArray();
// };

module.exports = mongoose.model("Place", placeSchema);
