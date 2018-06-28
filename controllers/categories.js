const places = require('../data/sample.json');
module.exports = (req, res) => {
	// let cats = [];
	// const categories = places.filter( place => {
	// 	if( ! cats.includes(place.category.name) ) {
	// 		cats.push(place);
	// 	}
	// }); // query data for requested category
	// console.log(cats);
	// let pageTitle = '';
	// ( placesInCategory.length > 0 ) ? pageTitle = placesInCategory[0].category.name : '';
	res.render('categories/index', { categories : places });
};