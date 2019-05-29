const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const common = require('./webpack.common.js');

let webpackConfig = merge(common, {
	devtool: '#source-map',
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.(less|css)$/,
				use: [{
					loader: MiniCssExtractPlugin.loader,
				}, 'css-loader', {
					loader: 'postcss-loader',
						options: {
							plugins: () => [
                // add prefixer for different browers,remove redundant prefixer
								autoprefixer({add: true, remove: true, browsers: ['>0%']})
							]
						}
				}, 'less-loader']
			}
		]
	},
	optimization: {
		minimizer: [
		  // we specify a custom UglifyJsPlugin here to get source maps in production
		  new UglifyJSPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      }),
      // Prevent compression from causing prefix loss
		  new OptimizeCSSAssetsPlugin({})
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/antd-pro.[name].css',
			chunkFilename: 'css/antd-pro.[id].[hash].css' // use contenthash *
		}),
    new HtmlwebpackPlugin({
      filename: 'antd.html',
      template: 'antd.html',
      inject: true,
      minify: {
          // https://github.com/kangax/html-minifier#options-quick-reference
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    // new AddAssetHtmlPlugin({
    //   filepath: path.resolve(__dirname, 'dist/dll/vendors.dll.js'), // 这个路径是你的dll文件路径
    //   includeSourcemap: false // 这里是因为我开启了sourcemap。 不这么写会报错。
    // }),
	  new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/assets'),
        to: path.resolve(__dirname, 'dist/assets'),
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, 'favicon.ico'),
        to: path.resolve(__dirname, 'dist/')
      }
    ]),

    // Compile code that changes infrequently separately
    new webpack.DllReferencePlugin({
      // same with context in webpack.dll.config.js
      context: __dirname,
      // import manifest file which export by webpack.dll.config.js
      manifest: path.resolve(__dirname, './dist/dll/vendors-manifest.json')
    }),
    // webpack3 new feature,Scope Hoisting
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
			'process.env': {
			 'NODE_ENV': JSON.stringify('production')
			}
		})
	]
})

// 开启包分析的情况时， 给 webpack plugins添加 webpack-bundle-analyzer 插件
// `npm run build --report`
if (process.env.npm_config_report) {
    // https://github.com/th0r/webpack-bundle-analyzer
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig;
