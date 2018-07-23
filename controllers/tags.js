const mongoose = require('mongoose');
const Place = mongoose.model('Place');

exports.index = async (req, res) => {
	const tag = req.params.tag;
	const tagQuery = tag || { $exists: true }
	const pageTitle = (tag ? tag : "Tags");
	const tagsPromise = Place.getTagsList();
	const placesPromise = Place.find({ tags: tagQuery });
	const [tags, places] = await Promise.all([tagsPromise, placesPromise]);
	res.render('tags/index', { pageTitle, tags, tag, places } );
	// res.json(tags);
};