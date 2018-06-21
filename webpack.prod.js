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
	module: {
		rules: [
			{
				test: /\.js$/,
				include: common.prod,
				loader: "babel-loader",
				query: {
					presets:['react', 'es2015', 'stage-2']
				}
			}
		]
	}
};