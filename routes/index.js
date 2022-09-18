const express = require("express");
const router = express.Router();

const { catchErrors } = require("../handlers/errorHandlers");

const homeController = require("../controllers/index");
const placesController = require("../controllers/places");
const placeController = require("../controllers/place");
const categoriesController = require("../controllers/categories");
const tagsController = require("../controllers/tags");

const userController = require("../controllers/user");
const authController = require("../controllers/authController");

/* NOT LOGGED IN */

router.get("/", homeController);

router.get("/login", userController.login);
router.post("/login", authController.login);

router.get("/logout", authController.logout);

router.get("/register", userController.register);
// 1. validate registration data - 2. register user - 3. log user in
router.post(
	"/register",
	userController.validateRegister,
	userController.createUser,
	catchErrors(authController.registerEmail),
	authController.login
);

router.get("/forgot-password", userController.forgotPassword);
router.post("/forgot-password", catchErrors(authController.forgot));

router.get("/account/reset/:token", catchErrors(authController.reset));
router.post(
	"/account/reset/:token",
	authController.confirmedPasswords,
	catchErrors(authController.updatePassword)
);

/* MUST BE LOGGED IN */

router.get("/account", authController.isLoggedIn, userController.account);
router.post(
	"/account",
	authController.isLoggedIn,
	catchErrors(userController.updateAccount)
);

router.get(
	"/categories",
	authController.isLoggedIn,
	catchErrors(categoriesController.index)
);

router.get(
	"/categories/:category",
	authController.isLoggedIn,
	catchErrors(categoriesController.category)
);

router.get(
	"/categories/:category/page/:page",
	authController.isLoggedIn,
	catchErrors(categoriesController.category)
);

router.get(
	"/tags",
	authController.isLoggedIn,
	catchErrors(tagsController.index)
);

router.get(
	"/tags/page/:page",
	authController.isLoggedIn,
	catchErrors(tagsController.index)
);

router.get(
	"/tags/:tag",
	authController.isLoggedIn,
	catchErrors(tagsController.index)
);

router.get(
	"/tags/:tag/page/:page",
	authController.isLoggedIn,
	catchErrors(tagsController.index)
);

router.get(
	"/places",
	authController.isLoggedIn,
	catchErrors(placesController.index)
);
router.get(
	"/places/page/:page",
	authController.isLoggedIn,
	catchErrors(placesController.index)
);

router.get(
	"/places/add-place",
	authController.isLoggedIn,
	placesController.addPlace
);

router.post(
	"/places/add-place",
	authController.isLoggedIn,
	placesController.upload,
	catchErrors(placesController.resize),
	catchErrors(placesController.createPlace)
);

router.get(
	"/place/:id",
	authController.isLoggedIn,
	catchErrors(placeController.place)
);

router.post(
	"/place/:id/update-image",
	authController.isLoggedIn,
	placesController.upload,
	catchErrors(placesController.resize),
	catchErrors(placeController.updateImage)
);

router.delete(
	"/place/:id",
	authController.isLoggedIn,
	catchErrors(placeController.deletePlace)
);

router.get(
	"/place/:id/visits",
	authController.isLoggedIn,
	catchErrors(placeController.visits)
);

router.get(
	"/place/:id/visits/page/:page",
	authController.isLoggedIn,
	catchErrors(placeController.visits)
);

router.get(
	"/place/:id/add-visit",
	authController.isLoggedIn,
	catchErrors(placeController.addVisit)
);

router.post(
	"/place/:id/add-visit",
	authController.isLoggedIn,
	catchErrors(placeController.createVisit)
);

router.delete(
	"/place/:id/visit/:visitId",
	authController.isLoggedIn,
	catchErrors(placeController.deleteVisit)
);

router.post(
	"/place/:id/update-place",
	authController.isLoggedIn,
	catchErrors(placeController.updatePlace)
);

router.get(
	"/place/:id/visit/:visitId",
	authController.isLoggedIn,
	catchErrors(placeController.visit)
);

router.post(
	"/place/:id/visit/:visitId",
	authController.isLoggedIn,
	catchErrors(placeController.updateVisit)
);

module.exports = router;
