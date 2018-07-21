const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');

const homeController = require('../controllers/index');
const placesController = require('../controllers/places');
const placeController = require('../controllers/place');
const categoriesController = require('../controllers/categories');
const categoryController = require('../controllers/category');

router.get('/', homeController);

router.get('/places', catchErrors(placesController.index));

router.get('/places/add-place', placesController.addPlace);
router.post('/places/add-place',
	placesController.upload,
	catchErrors(placesController.resize),
	catchErrors(placesController.createPlace));

router.get('/places/:category', categoryController);

router.get('/categories', categoriesController);

router.get('/place/:id', catchErrors(placeController.place));
router.get('/place/:id/visits', catchErrors(placeController.visits));

router.get('/place/:id/add-visit',  catchErrors(placeController.addVisit));
router.post('/place/:id/add-visit', catchErrors(placeController.createVisit));

router.post('/place/:id/update-place', catchErrors(placeController.updatePlace));

router.get('/place/:id/visit/:visitId', placeController.visit);

module.exports = router;