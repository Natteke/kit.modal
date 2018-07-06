const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let path = require('path'),
	common = {
		mode: 'production',
		dev: __dirname + '/dev/',
		dist: __dirname + '/dist/',
		prod: __dirname + '/prod/'
	};

module.exports = {
	mode: common.mode,
	entry: {
		'kit.modal': common.dev + 'kit.modal.js'
	},
	output: {
		path: common.prod,
		filename: '[name].js',
		chunkFilename: 'chunks/[id].js',
		publicPath: common.prod
	},
	devServer: {
		contentBase: common.prod,
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
				include: common.prod,
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
							minimize: true,
							localIdentName: "[hash:base64:5]"
						},
					}
				]
			}
		]
	}
};