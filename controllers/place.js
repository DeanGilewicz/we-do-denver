const places = require('../data/sample.json');
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
	// const place = places.find( place => place.id == req.params.id ); // query data for requested place
	const place = await Place.findById(req.params.id);
	const visits = place.visits;
	const modifiedVisits = visits.map( visit => {
		visit.prettyCreated = moment(visit.created).format('MM/DD/YYYY'); // prettify the date
		return visit;
	});
	res.render('place/visits', { pageTitle: place.name, place, visits: modifiedVisits });
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
	
	// res.redirect(`/place/${placeId}`);
	// res.send('oh');
	// const tagsArr = place.tags.map( (tag) => tag.split(/[ ,]+/).filter(Boolean));
	// place.tags = tagsArr[0];
	// await place.save();
	// res.redirect('/places');
};