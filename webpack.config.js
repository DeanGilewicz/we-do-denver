const path = require("path");

/*
  webpack sees every file as a module.
  How to handle those files is up to loaders.
  We only have a single entry point (a .js file) and everything is required from that js file
*/

// This is our JavaScript rule that specifies what to do with .js files
const javascript = {
	test: /\.(js)$/, // we match anything that ends in `.js`
	use: [
		{
			loader: "babel-loader",
		},
	],
};

// This is our postCSS loader which gets fed into the next loader
const postcss = {
	loader: "postcss-loader",
	options: {
		postcssOptions: {
			plugins: [
				[
					"postcss-preset-env",
					{
						// Options
					},
				],
			],
		},
	},
};

// this is our sass/css loader. It handles files that are require('something.scss')
const styles = {
	test: /\.(scss|css)$/,
	use: ["style-loader", "css-loader", postcss, "sass-loader"],
};

// put it all together
const config = {
	entry: {
		// we only have 1 entry, but I've set it up for multiple in the future
		App: "./public/js/app.js",
	},
	// we're using sourcemaps and here is where we specify which kind of sourcemap to use
	devtool: "source-map",
	// Once things are done, we kick it out to a file.
	output: {
		// path is a built in node module
		// __dirname is a variable from node
		path: path.resolve(__dirname, "public", "dist"),
		// we can use "substitutions" in file names like [name] and [hash]
		// name will be `App` because that is what we used above in our entry
		filename: "[name].bundle.js",
	},
	// webpack sees everything as modules and loaders are responsible for different file types so here is where we implement them. Pass it the rules for our JS and our styles
	module: {
		rules: [javascript, styles],
	},
	// finally we pass it an array of our plugins - uncomment if you want to uglify
	// plugins: [uglify]
	// plugins: [
	// here is where we tell it to output our css to a separate file
	// new MiniCssExtractPlugin(),
	// ],
};
// webpack can be funny about some packages using a soon to be deprecated API so we quieten it.
// process.noDeprecation = true;

module.exports = config;
