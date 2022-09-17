const mongoose = require("mongoose");

// Make sure we are running node 18+
const [major] = process.versions.node.split(".").map(parseFloat);
if (major < 18) {
	console.log(
		"You are on an older version of node and need to upgrade. Please go to nodejs.org and download version 16 or greater."
	);
	process.exit();
}

// import environmental variables from our variables.env file
require("dotenv").config({ path: "variables.env" });

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE_URL, {
	useCreateIndex: true,
	useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", (err) => {
	console.error(`${err.message}`);
});

// Import all of our models
require("./models/Place");
require("./models/User");

// Start our app!
const app = require("./app");
app.set("port", process.env.PORT || 7777);
const server = app.listen(app.get("port"), () => {
	console.log(`Express running on PORT ${server.address().port}`);
});
