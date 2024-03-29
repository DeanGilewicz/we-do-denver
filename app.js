const path = require("path");

const helpers = require("./helpers");

const express = require("express");
const session = require("express-session");
const expressValidator = require("express-validator");

const bodyParser = require("body-parser");

const MongoStore = require("connect-mongo");

const { promisify } = require("es6-promisify");
const flash = require("connect-flash");

const routes = require("./routes/index");
const methodOverride = require("method-override");

const errorHandlers = require("./handlers/errorHandlers");

const passport = require("passport");

require("./handlers/passport");

// create our Express app
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views")); // this is the folder where we keep our pug files
app.set("view engine", "pug"); // we use the engine pug, mustache or EJS work great too

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, "public")));

// takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable HTML forms to post HTTP DELETE and PUT
app.use(
	methodOverride(function (req, res) {
		if (req.body && typeof req.body === "object" && "_method" in req.body) {
			// look in urlencoded POST bodies and delete it
			const method = req.body._method;
			delete req.body._method;
			return method;
		}
	})
);

// exposes a bunch of methods for validating data. Used heavily on auth.validateRegister
app.use(expressValidator());

// sessions allow us to store data on visitors from request to request
// this keeps users logged in and allows us to send flash messages
app.use(
	session({
		secret: process.env.SECRET,
		key: process.env.KEY,
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
	})
);

// Passport JS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

// the flash middleware let's us use req.flash('error', 'oh no!'), which will then pass that message to the next page the user requests
app.use(flash());

// pass variables to our templates + all requests
app.use((req, res, next) => {
	res.locals.h = helpers;
	res.locals.flashes = req.flash();
	res.locals.user = req.user || null;
	res.locals.currentPath = req.path;
	next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
	req.login = promisify(req.login, req);
	next();
});

// after the above middleware, we can now handle our own routes
app.use("/", routes);

// if user requested route not handled with our routes, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// we now see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// if not a validation error then this is a really bad error we didn't expect
if (app.get("env") === "development") {
	// development error handler - prints stack trace
	app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

// ok finally at the end. We can now export it so we can start up in start.js
module.exports = app;
