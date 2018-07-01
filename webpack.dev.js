let path = require('path'),
	common = {
		mode: 'development',
		dev: __dirname + '/dev/',
		dist: __dirname + '/dist/',
		production: __dirname + '/production/'
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
	module: {
		rules: [
			{
				test: /\.js$/,
				include: common.dev,
				loader: "babel-loader",
				query: {
					presets:['react', 'es2015', 'stage-2']
				}
			}
		]
	}
};