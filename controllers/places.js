// const places = require('../data/sample.json');
const mongoose = require('mongoose');
const Place = mongoose.model('Place');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
	storage: multer.memoryStorage(),
	fileFilter(req, file, next) {
		const isPhoto = file.mimetype.startsWith('image/');
		if(isPhoto) {
			next(null, true);
		} else {
			next({ message: 'That filetype isn\'t allowed!'}, false);
		}
	} 
};

exports.index = async (req, res) => {	
	const sortBy = req.query.q || 'created';
	const orderBy = req.query.s || 'desc';
	const sort = {};
	sort[sortBy] = orderBy;
	
	const queryString = ( sortBy === 'created' && orderBy === 'desc' ) ? '' : `?q=${sortBy}&s=${orderBy}`;
	const querySort = ( orderBy === 'desc' ) ? -1 : 1;

	const page = req.params.page || 1;
	const limit = 4;
	const skip = ( page * limit ) - limit;

	let placesPromise;

  	if( sortBy === 'visits') {
  		placesPromise = Place.aggregate([
	  		{ "$match" : {owner: {$eq: req.user._id}} },
			{ "$addFields" : { "totalVisits": {$size: "$visits"} } },
			{ "$sort" : { "totalVisits": querySort } },
			{ "$skip" : skip },
			{ "$limit" : limit }
		]).cursor({}).exec().toArray();
  	} else {
  		// query db for places owned by currently logged in user
		placesPromise = Place
			.find({ owner: {$eq: req.user._id} })
			.sort(sort)
			.skip(skip)
			.limit(limit);
  	}

	const countPromise = Place.count({ owner: {$eq: req.user._id} });

	const [places, count] = await Promise.all([placesPromise, countPromise]);

	const pages = Math.ceil(count/limit);

	// redirect to last page of pagination
	if( !places.length && skip ) {
		req.flash('info', `You asked for page ${page} but that does not exist. Instead you are on page ${pages}`);
		res.redirect(`/places/page/${pages}`);
		return;
	}
	
	res.render('places/index', { pageTitle: 'Places', places, page, pages, count, paginationLinkUrl: '/places/page/', queryString });
};

exports.addPlace = (req, res) => {
	res.render('places/add-place', { pageTitle: 'Add Place' });
};

exports.upload = multer(multerOptions).single('img');

exports.resize = async (req, res, next) => {
	// check if there is no new file to resize
	if( !req.file ) {
		next(); // skip to next middle (createPlace)
		return;
	}
	let extension = req.file.mimetype.split('/')[1];
	if( extension === 'jpeg' ) { extension = 'jpg'; }
	req.body.img = `${uuid.v4()}.${extension}`;
	// now resize
	const img = await jimp.read(req.file.buffer);
	await img.resize(800, jimp.AUTO);
	await img.write(`./public/uploads/${req.body.img}`);
	// now file written to server move on
	next();
};

exports.createPlace = async (req, res) => {
	req.body.owner = req.user._id;
	const place = new Place(req.body);
	const tagsArr = place.tags.join(',').split(/[,]+/).map((item)=>item.trim()).filter(Boolean);
	place.tags = tagsArr;
	await place.save();
	req.flash('success', `You've created ${place.name}!`);
	res.redirect('/places');
};

// exports.searchPlaces = async (req, res) => {
// 	const places = await Place.find({
// 		$text: {
// 			$search: req.query.q
// 		}
// 	}, {
// 		score: { $meta: 'textScore' }
// 	}).sort({
// 		score: { $meta: 'textScore' }
// 	});
// 	res.json(places);
// };
