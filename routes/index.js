const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');

const homeController = require('../controllers/index');
const placesController = require('../controllers/places');
const placeController = require('../controllers/place');
const categoriesController = require('../controllers/categories');
const categoryController = require('../controllers/category');
const tagsController = require('../controllers/tags');

const userController = require('../controllers/user');
const authController = require('../controllers/authController');

router.get('/', homeController);

router.get('/login', userController.login);

router.get('/register', userController.register);
// 1. validate registration data - 2. register user - 3. log user in
router.post('/register', 
	userController.validateRegister,
	userController.createUser,
	authController.login
); 

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

router.get('/tags', catchErrors(tagsController.index));
router.get('/tags/:tag', catchErrors(tagsController.index));

module.exports = router;