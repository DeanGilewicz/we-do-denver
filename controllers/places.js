const places = require('../data/sample.json');

exports.index = (req, res) => {
	res.render('places/index', { pageTitle: 'Places', places });
};

exports.addPlace = (req, res) => {
	res.render('places/add-place', { pageTitle: 'Add Place' });
};