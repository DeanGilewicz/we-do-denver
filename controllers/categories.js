const places = require('../data/sample.json');

module.exports = (req, res) => {
	let uniqueCatSlugs = [];
	let filteredPlaces = [];
	places.forEach( place => {
		if( ! uniqueCatSlugs.includes(place.category.name) ) {
			uniqueCatSlugs.push(place.category.name);
			filteredPlaces.push(place);
		}
	}); // filter data to get unique categories only
	console.log(uniqueCatSlugs);
	console.log(filteredPlaces);

	res.render('categories/index', { places: filteredPlaces, pageTitle: 'Categories' });
};