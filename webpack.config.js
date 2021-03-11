// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = {
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin({ extractComments: false })],
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				type: "javascript/auto",
				resolve: {
					fullySpecified: false,
				},
				use: {
					loader: "babel-loader",
				},
			},
		],
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		library: "ManyCamSDK",
		libraryTarget: "umd",
		// globalObject: "this",
	},
};
const nodeConfig = merge(baseConfig, {
	target: "node",
	entry: "./index.js",
	output: {
		filename: "manycamNode.js",
	},
});
const browserConfig = merge(baseConfig, {
	target: "web",
	entry: "./index.js",
	output: {
		filename: "manycam.js",
	},
});
module.exports = [browserConfig];
