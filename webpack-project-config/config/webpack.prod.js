const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = merge(common, {
	mode: 'production',
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, '../dist'),
		clean: true,
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
								config: path.resolve(__dirname, 'postcss.config.prod.js'),
							},
						},
					},
				],
			},
		],
	},
	stats: 'minimal',
});
