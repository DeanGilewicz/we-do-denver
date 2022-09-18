// const places = require('../data/sample.json');
const mongoose = require("mongoose");
const Place = mongoose.model("Place");

exports.index = async (req, res) => {
	// filter data to get unique categories only
	// let uniqueCatSlugs = [];
	// let filteredPlaces = [];
	// places.forEach( place => {
	// 	if( ! uniqueCatSlugs.includes(place.category.name) ) {
	// 		uniqueCatSlugs.push(place.category.name);
	// 		filteredPlaces.push(place);
	// 	}
	// });

	// use mongodb aggregate query - distinct query is only for one thing
	const uniqueCategories = await Place.aggregate([
		{ $match: { owner: { $eq: req.user._id } } },
		{
			$group: {
				_id: "$category.slug",
				slug: { $first: "$category.slug" },
				name: { $first: "$category.name" },
				icon: { $first: "$category.icon" },
			},
		},
		{ $project: { _id: false } },
	])
		.cursor({})
		.exec()
		.toArray();

	res.render("categories/index", {
		categories: uniqueCategories,
		pageTitle: "Categories",
	});
};

exports.category = async (req, res) => {
	// get category name
	const categorySlug = req.params.category;

	const sortBy = req.query.q || "created";
	const orderBy = req.query.s || "desc";
	const sort = {};
	sort[sortBy] = orderBy;

	const queryString =
		sortBy === "created" && orderBy === "desc"
			? ""
			: `?q=${sortBy}&s=${orderBy}`;
	const querySort = orderBy === "desc" ? -1 : 1;

	const page = req.params.page || 1;
	const limit = 9;
	const skip = page * limit - limit;

	let placesPromise;

	if (sortBy === "visits") {
		placesPromise = Place.aggregate([
			{
				$match: {
					owner: { $eq: req.user._id },
					"category.slug": { $eq: categorySlug },
				},
			},
			{ $addFields: { totalVisits: { $size: "$visits" } } },
			{ $sort: { totalVisits: querySort } },
			{ $skip: skip },
			{ $limit: limit },
		])
			.cursor({})
			.exec()
			.toArray();
	} else {
		// query db for places owned by currently logged in user and with same category slug
		placesPromise = Place.find({
			owner: { $eq: req.user._id },
			"category.slug": { $eq: categorySlug },
		})
			.sort(sort)
			.skip(skip)
			.limit(limit);
	}

	const countPromise = Place.count({
		owner: { $eq: req.user._id },
		"category.slug": { $eq: categorySlug },
	});

	const [places, count] = await Promise.all([placesPromise, countPromise]);

	const pages = Math.ceil(count / limit);

	// dynamically get category name (all places should have the same so just get the name from the first one)
	const pageTitle = places.length > 0 ? places[0].category.name : "";

	// redirect to last page of pagination
	if (!places.length && skip) {
		req.flash(
			"info",
			`You asked for page ${page} but that does not exist. Instead you are on page ${pages}`
		);
		res.redirect(`/categories/${categorySlug}/${pages}`);
		return;
	}

	res.render("category/index", {
		pageTitle,
		categorySlug,
		places,
		page,
		pages,
		count,
		paginationLinkUrl: `/categories/${categorySlug}/page/`,
		queryString,
	});
};
