// const places = require('../data/sample.json');
const mongoose = require('mongoose');
const Place = mongoose.model('Place');
module.exports = async (req, res) => {
	// filter data to get unique categories only
	// let uniqueCatSlugs = [];
	// let filteredPlaces = [];
	// places.forEach( place => {
	// 	if( ! uniqueCatSlugs.includes(place.category.name) ) {
	// 		uniqueCatSlugs.push(place.category.name);
	// 		filteredPlaces.push(place);
	// 	}
	// }); 

	// use mongodb aggregate query - distinct query is only for one thing
	const uniqueCategories = await Place.aggregate([
		{ $group: { _id: '$category.slug', slug: { $first: '$category.slug' }, name: { $first: '$category.name' }, icon: { $first: '$category.icon' } } },
		{ $project: { _id: false } }
	]).cursor({}).exec().toArray();
	// console.log('uniqueCategories', uniqueCategories);

	res.render('categories/index', { categories: uniqueCategories, pageTitle: 'Categories' });
};