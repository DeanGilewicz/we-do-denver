const mongoose = require("mongoose");
const Place = mongoose.model("Place");

exports.index = async (req, res) => {
	// get tag
	const tag = req.params.tag;

	const page = req.params.page || 1;
	const limit = 9;
	const skip = page * limit - limit;

	const tagQuery = tag || { $exists: true };
	// const tagsPromise = await Place.getTagsList(); // FIX - issue with ref user and matching owner
	const tagsPromise = Place.aggregate([
		{ $match: { owner: req.user._id } },
		{ $unwind: "$tags" },
		{ $group: { _id: "$tags", count: { $sum: 1 } } },
		{ $sort: { count: -1 } },
	])
		.cursor({})
		.exec()
		.toArray();

	const placesPromise = Place.find({
		owner: { $eq: req.user._id },
		tags: tagQuery,
	})
		.skip(skip)
		.limit(limit);

	const countPromise = Place.count({
		owner: { $eq: req.user._id },
		tags: tagQuery,
	});
	const [tags, places, count] = await Promise.all([
		tagsPromise,
		placesPromise,
		countPromise,
	]);

	const pageTitle = tag ? tag : "Tags";

	const pages = Math.ceil(count / limit);

	// redirect to last page of pagination
	if (!places.length && skip) {
		req.flash(
			"info",
			`You asked for page ${page} but that does not exist. Instead you are on page ${pages}`
		);
		res.redirect(`/tags/${tag}/${pages}`);
		return;
	}

	// tags does not have a param like /tags/:tag
	if (!tag) {
		res.render("tags/index", {
			pageTitle,
			tags,
			tag,
			places,
			page,
			pages,
			count,
			paginationLinkUrl: `/tags/page/`,
			queryString: "",
		});
	} else {
		res.render("tags/index", {
			pageTitle,
			tags,
			tag,
			places,
			page,
			pages,
			count,
			paginationLinkUrl: `/tags/${tag}/page/`,
			queryString: "",
		});
	}
};
