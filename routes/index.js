const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');

const homeController = require('../controllers/index');
const placesController = require('../controllers/places');
const placeController = require('../controllers/place');
const categoriesController = require('../controllers/categories');
const categoryController = require('../controllers/category');

router.get('/', homeController);

router.get('/places', placesController.index);
router.get('/places/add-place', placesController.addPlace);
router.post('/places/add-place', catchErrors(placesController.createPlace));

router.get('/places/:category', categoryController);

router.get('/categories', categoriesController);

router.get('/place/:id', placeController.place);
router.get('/place/:id/visits', placeController.visits);
router.get('/place/:id/add-visit', placeController.addVisit);
router.get('/place/:id/visit/:visitId', placeController.visit);

module.exports = router;