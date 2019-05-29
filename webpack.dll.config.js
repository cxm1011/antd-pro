const webpack = require('webpack')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const dependencies = require('./package.json').dependencies
const CleanWebpackPlugin = require('clean-webpack-plugin')

const vendors = [];
for (let x in dependencies) {
	vendors.push(x)
}

const library = '[name]_[chunkhash]'
module.exports = {
	entry: {
		vendors: vendors
	},
	mode: 'production',
	output: {
		filename: '[name].dll.js',
		path: path.resolve(__dirname, 'dist/dll'),
		library
	},
	optimization: {
		minimizer: [
		  new UglifyJSPlugin({
			cache: true,
			parallel: true,
			uglifyOptions: {
			  compress: true,
			  ecma: 6,
			  mangle: true,
			},
			sourceMap: true,
			extractComments: true,
		  })
		]
	},
	module: {
		rules: [
			{
				test: /\.(less|css)$/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader'
				}, {
					loader: 'less-loader'
				}]
			}
		]
	},

	plugins: [
		new CleanWebpackPlugin(['dist']),
		new webpack.DllPlugin({
			path: path.join(__dirname, 'dist/dll/[name]-manifest.json'),
			// same with library name in output
			name: library,
			context: __dirname
		}),
		new webpack.DefinePlugin({
			'process.env': {
			 'NODE_ENV': JSON.stringify('production')
			}
		})
	]
}
