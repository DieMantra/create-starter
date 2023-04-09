const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = merge(common, {
	mode: 'development',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, './temp'),
		assetModuleFilename: 'images/[name].[ext]',
	},
	module: {
		rules: [
			{
				test: /\.(s[ac]|c)ss$/i,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						// 2. Turns css into commonjs
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
						},
					},

					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								config: path.resolve(__dirname, 'postcss.config.dev.js'),
							},
						},
					},
				],
			},
		],
	},
	devServer: {
		port: 8080,
		hot: true,
		onListening: function (devServer) {
			if (!devServer) {
				throw new Error('webpack-dev-server is not defined');
			}
			const port = devServer.server.address().port;
			console.log('Listening on :', 'http://localhost:' + port);
		},
		client: {
			logging: 'none',
			reconnect: 5,
		},
	},
	stats: 'minimal',
});
