const places = require('../data/sample.json');
module.exports = (req, res) => {
	res.render('places/index', { pageTitle: 'Places', places });
};