const places = require('../data/sample.json');
module.exports = (req, res) => {
	const placesInCategory = places.filter( place => place.category.slug == req.params.category ); // query data for requested category
	let pageTitle = '';
	( placesInCategory.length > 0 ) ? pageTitle = placesInCategory[0].category.name : '';
	res.render('category/index', {places: placesInCategory, pageTitle} );
};
