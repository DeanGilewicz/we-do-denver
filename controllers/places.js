const places = require('../data/sample.json');
const mongoose = require('mongoose');
const Place = mongoose.model('Place');

exports.index = (req, res) => {
	res.render('places/index', { pageTitle: 'Places', places });
};

exports.addPlace = (req, res) => {
	res.render('places/add-place', { pageTitle: 'Add Place' });
};

exports.createPlace = async (req, res) => {
	const place = new Place(req.body);
	const tags = place.tags.split(' ');
	place.tags = tags;
	
	await place.save();
	res.redirect('/places');
};