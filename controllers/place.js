// const places = require('../data/sample.json');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; // need to cast type when use aggregate 
const Place = mongoose.model('Place');
const slug = require('slugs');
const moment = require('moment');

exports.place = async (req, res) => {
	// const place = Place.find( place => place.id == req.params.id ); // query data for requested place
	const place = await Place.findById(req.params.id).populate('owner'); // populate owner - uses the owner property on Place model to return the owner data in addition
	// console.log(place);
	res.render('place/index', { pageTitle: place.name, place });
};

exports.deletePlace = async (req, res) => {
	const placeId = req.params.id;
	await Place.remove( { "_id" : { $eq: placeId } } );
	req.flash('success', 'Successfully deleted!');
	res.redirect(`/places`);
};

exports.updateImage = async (req, res) => {
	const place = await Place.findOneAndUpdate(
		{ _id: req.params.id },
		req.body,
		{
			new: true, // return the new Place (updated one)
			runValidators: true
		}
	).exec();
	req.flash('success', `Successfully updated <strong>${place.name}</strong>`);
	res.redirect(`/place/${place._id}`);
};

exports.updatePlace = async (req, res) => {
	// console.log(req.body);
	const place = await Place.findOneAndUpdate(
		{ _id: req.params.id },
		req.body,
		{
			new: true, // return the new Place (updated one)
			runValidators: true
		}
	).exec();
	req.flash('success', `Successfully updated <strong>${place.name}</strong>`);
	res.json(req.body); // send JSON back!
	// res.redirect(`/place/${place._id}`);
};

exports.visits = async (req, res) => {

	const propComparator = (propName, direction) => (a, b) => {
		// if asc
		if( direction === 'asc' ) {
			if( a[propName] > b[propName] ) {
				return 1;
			}
		}
		// if desc
		if( direction === 'desc' ) {
			if( a[propName] < b[propName] ) {
				return -1;
			}
		}
		// same
		return 0;
	}

	const sortBy = req.query.q || 'created';
	const orderBy = req.query.s || 'desc';
	const queryString = ( sortBy === 'created' && orderBy === 'desc' ) ? '' : `?q=${sortBy}&s=${orderBy}`;

	const page = req.params.page || 1;
	const limit = 6;
	const skip = ( page * limit ) - limit;
	
	const place = await Place.findById(req.params.id);
	
	const visits = place.visits
		.map( visit => {
			visit.prettyCreated = moment(visit.created).format('MM/DD/YYYY'); // prettify the date
			return visit;
		})
		.sort(propComparator(sortBy,orderBy))
		.slice(skip, (skip + limit));
	// console.log(visits);

	const count = place.visits.length;
	const pages = Math.ceil(count/limit);

	// redirect to last page of pagination
	if( !visits.length && skip ) {
		req.flash('info', `You asked for page ${page} but that does not exist. Instead you are on page ${pages}`);
		res.redirect(`/place/${req.params.id}/visits/page/${pages}`);
		return;
	}

	res.render('place/visits', { pageTitle: place.name, place, visits, page, pages, count, paginationLinkUrl: `/place/${req.params.id}/visits/page/`, queryString });
};

exports.visit = async (req, res) => {
	// const place = places.find( place => place.id == req.params.id ); // query data for requested place
	// const visit = place.visits.find( visit => visit.id == req.params.visitId );
	const place = await Place.aggregate([
		{ $match : { _id: ObjectId(req.params.id) } },
		{ $unwind: '$visits'},
		{ $match : { 'visits._id' : ObjectId(req.params.visitId) } }
	]).cursor({}).exec().toArray();
	const singlePlace = place[0];
	res.render('place/visit', { pageTitle: singlePlace.name, place: singlePlace, visit: singlePlace.visits });
};

exports.addVisit = async (req, res) => {
	// const place = places.find( place => place.id == req.params.id ); // query data for requested place
	const place = await Place.findById(req.params.id);
	res.render('place/add-visit', { pageTitle: 'Add Visit', place });
}

exports.updateVisit = async (req, res) => {
	// const place = places.find( place => place.id == req.params.id ); // query data for requested place
	const placeId = req.params.id;
	const visitId = req.params.visitId;

	// update visit on Place
	await Place.updateOne(
		{ _id: placeId, "visits._id": visitId },
		{ $set: { "visits.$.comment" : req.body.visit.comment, "visits.$.cost" : req.body.visit.cost, "visits.$.rating" : req.body.visit.rating } }
	);

	await Place.findById(placeId, async (err, place) => {
		const ratingTotal = place.visits.reduce((sV, cV) => ({rating: sV.rating + cV.rating}));
		const costTotal = place.visits.reduce((sV, cV) => ({cost: sV.cost + cV.cost}));
		// get average visits
		const totalVisits = place.visits.length;
		// calculate averages
		const aveCost = (costTotal.cost / totalVisits).toFixed(2);
		const aveRating = (ratingTotal.rating / totalVisits).toFixed(2);
		// set values on Place
		place.cost = aveCost;
		place.rating = aveRating;
		// save
		await place.save();
	});

	req.flash('success', 'Successfully updated!');
	res.redirect(`/place/${placeId}/visits`);

}

exports.createVisit = async (req, res) => {
	// console.log(req.body);
	const placeId = req.params.id;
	// req.body.updated = Date.now();
	// Place.findByIdAndUpdate(placeId, req.body, function(err, doc) {
	// 	if(err) throw err;
	// 	console.log('err', err);
	// 	console.log('doc', doc);
	// });
	Place.findById(placeId, async (err, doc) => {
		if(err) throw err;
		try {
			doc.visits.push(req.body.visits);
			await doc.save();
			req.flash('success', 'Successfully updated!');
			res.redirect(`/place/${placeId}`);
		} catch(err) {
			console.error('Error', err);
		}
	});
};

exports.deleteVisit = async (req, res) => {
	const placeId = req.params.id;
	const visitId = req.params.visitId;
	await Place.update(
		{ "_id" : placeId },
		{ "$pull" : { "visits" : { "_id" : visitId } } }
	);

	await Place.findById(placeId, async (err, place) => {
		const ratingTotal = place.visits.reduce((sV, cV) => ({rating: sV.rating + cV.rating}));
		const costTotal = place.visits.reduce((sV, cV) => ({cost: sV.cost + cV.cost}));
		// get average visits
		const totalVisits = place.visits.length;
		// calculate averages
		const aveCost = (costTotal.cost / totalVisits).toFixed(2);
		const aveRating = (ratingTotal.rating / totalVisits).toFixed(2);
		// set values on Place
		place.cost = aveCost;
		place.rating = aveRating;
		// save
		await place.save();
	});

	req.flash('success', 'Successfully deleted!');
	res.redirect(`/place/${placeId}/visits`);
};
