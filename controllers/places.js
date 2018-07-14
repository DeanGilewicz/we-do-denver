const places = require('../data/sample.json');
const mongoose = require('mongoose');
const Place = mongoose.model('Place');

exports.index = async (req, res) => {
	// query db for places
	const places = await Place.find();
	// console.log(places);
	res.render('places/index', { pageTitle: 'Places', places });
};

exports.addPlace = (req, res) => {
	res.render('places/add-place', { pageTitle: 'Add Place' });
};

exports.createPlace = async (req, res) => {
	const place = new Place(req.body);
	const tagsArr = place.tags.map( (tag) => tag.trim().split(/[,]+/).filter(Boolean));
	place.tags = tagsArr[0];
	await place.save();
	req.flash('success', `You've created ${place.name}!`);
	res.redirect('/places');
};