const express = require('express');
const router = express.Router();

const homeController = require('../controllers/index');
const placesController = require('../controllers/places');

router.get('/', homeController);
router.get('/places', placesController);

module.exports = router;