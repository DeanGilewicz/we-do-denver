const places = require('../data/sample.json');
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
	// query db for places owned by currently logged in user
	const places = await Place.find({ owner: {$eq: req.user._id} });
	// console.log(places);
	res.render('places/index', { pageTitle: 'Places', places });
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
	const tagsArr = place.tags.map( (tag) => tag.trim().split(/[,]+/).filter(Boolean));
	place.tags = tagsArr[0];
	await place.save();
	req.flash('success', `You've created ${place.name}!`);
	res.redirect('/places');
};
