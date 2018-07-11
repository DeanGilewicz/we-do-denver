const places = require('../data/sample.json');
const mongoose = require('mongoose');
const Place = mongoose.model('Place');

exports.place = (req, res) => {
	const place = places.find( place => place.id == req.params.id ); // query data for requested place
	res.render('place/index', { pageTitle: place.name, place });
};

exports.visits = (req, res) => {
	const place = places.find( place => place.id == req.params.id ); // query data for requested place
	const visits = place.visits;
	res.render('place/visits', { pageTitle: place.name, place, visits });
};

exports.visit = (req, res) => {
	const place = places.find( place => place.id == req.params.id ); // query data for requested place
	const visit = place.visits.find( visit => visit.id == req.params.visitId );
	res.render('place/visit', { pageTitle: visit.id, place, visit });
};

exports.addVisit = (req, res) => {
	const place = places.find( place => place.id == req.params.id ); // query data for requested place
	res.render('place/add-visit', { pageTitle: 'Add Visit', place });
}

exports.createVisit = async (req, res) => {
	// const placeId = req.params.id;
	// Place.findByIdAndUpdate('5b458a14a258a22046f9c66e', {visitArr}, function(err, doc) {
	// 	if( err ) throw err;
	// 	console.log('err', err);
	// 	console.log('doc', doc);
	// });
	Place.findById('5b458a14a258a22046f9c66e', async (err, doc) => {
		if( err ) throw err;
		doc.visits.push(req.body);
		await doc.save();
		res.redirect(`/place/${req.params.id}`);
	});
	

	// const tagsArr = place.tags.map( (tag) => tag.split(/[ ,]+/).filter(Boolean));
	// place.tags = tagsArr[0];
	// await place.save();
	// res.redirect('/places');
};