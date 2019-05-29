const merge = require('webpack-merge');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	devtool: 'eval-source-map',
	mode: 'development',
	plugins: [
		new HtmlwebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: true
   		}),
		// will cause the relative path of the module to be displayed when HMR is enabled
	    new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
	       'process.env': {
	         'NODE_ENV': JSON.stringify('development')
	       }
		}),
	    // show error infomation
        new FriendlyErrorsPlugin()
	]
});
