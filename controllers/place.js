const places = require('../data/sample.json');

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