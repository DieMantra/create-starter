const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/index.tsx',

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
	},

	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						configFile: path.resolve(__dirname, '.babelrc'),
					},
				},
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
		new ForkTsCheckerWebpackPlugin({
			typescript: { configFile: path.resolve(__dirname, '../tsconfig.json') },
		}),
		new HtmlWebpackPlugin({
			inject: true,
			template: `./src/index.html`,
			filename: 'index.html',
		}),
	],
	watchOptions: {
		ignored: /node_modules/,
	},
};
