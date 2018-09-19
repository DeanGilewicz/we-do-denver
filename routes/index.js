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
router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/register', userController.register);
// 1. validate registration data - 2. register user - 3. log user in
router.post('/register', 
	userController.validateRegister,
	userController.createUser,
	authController.login
);

router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));

router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token',
	authController.confirmedPasswords,
	catchErrors(authController.updatePassword));

router.get('/forgot-password', userController.forgotPassword);
router.post('/forgot-password', catchErrors(authController.forgot));

router.get('/places', authController.isLoggedIn, catchErrors(placesController.index));

router.get('/places/add-place', authController.isLoggedIn, placesController.addPlace);
router.post('/places/add-place',
	placesController.upload,
	catchErrors(placesController.resize),
	catchErrors(placesController.createPlace));

router.get('/places/:category', categoryController);

router.get('/categories', catchErrors(categoriesController));

router.get('/place/:id', catchErrors(placeController.place));
router.post('/place/:id/update-image',
	placesController.upload,
	catchErrors(placesController.resize),
	catchErrors(placeController.updateImage));
router.delete('/place/:id', catchErrors(placeController.deletePlace));

router.get('/place/:id/visits', catchErrors(placeController.visits));

router.get('/place/:id/add-visit',  catchErrors(placeController.addVisit));
router.post('/place/:id/add-visit', catchErrors(placeController.createVisit));
router.delete('/place/:id/visit/:visitId', catchErrors(placeController.deleteVisit));

router.post('/place/:id/update-place', catchErrors(placeController.updatePlace));

router.get('/place/:id/visit/:visitId', catchErrors(placeController.visit));
router.post('/place/:id/visit/:visitId', catchErrors(placeController.updateVisit));

router.get('/tags', catchErrors(tagsController.index));
router.get('/tags/:tag', catchErrors(tagsController.index));

/* API */

router.get('/api/search', catchErrors(placesController.searchPlaces));

module.exports = router;