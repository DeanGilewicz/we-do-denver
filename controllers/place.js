const places = require('../data/sample.json');
module.exports = (req, res) => {
	const place = places.find( place => place.id == req.params.id ); // query data for requested place
	res.render('places/place', { pageTitle: place.name, place });
};