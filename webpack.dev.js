const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let path = require('path'),
	common = {
		mode: 'development',
		dev: __dirname + '/dev/',
		dist: __dirname + '/dist/'
};

module.exports = {
	mode: 'development',
	entry: {
		'kit.modal': common.dev + 'kit.modal.js'
	},
	output: {
		path: common.dist,
		filename: '[name].js',
		chunkFilename: 'chunks/[id].js',
		publicPath: common.dist
	},
	devServer: {
		contentBase: common.dist,
		port: 8080
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "[name].min.css",
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				include: common.dev,
				loader: "babel-loader",
				query: {
					presets:['react', 'es2015', 'stage-2']
				}
			},
			{
				test: /\.css$/,
				include: common.dev,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it use publicPath in webpackOptions.output
							publicPath: '../'
						}
					},
					{
						loader: require.resolve('css-loader'),
						options: {
							importLoaders: 1,
							modules: false,
							minimize: false,
							localIdentName: "[hash:base64:5]"
						},
					}
				]
			}
		]
	}
};