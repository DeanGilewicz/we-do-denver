const express = require('express');
const router = express.Router();

const homeController = require('../controllers/index');
const placesController = require('../controllers/places');
const placeController = require('../controllers/place');
const categoriesController = require('../controllers/categories');
const categoryController = require('../controllers/category');

router.get('/', homeController);

router.get('/places', placesController);
router.get('/places/:category', categoryController);

router.get('/categories', categoriesController);

router.get('/place/:id', placeController);

module.exports = router;