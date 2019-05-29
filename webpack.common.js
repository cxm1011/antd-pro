const path = require('path');

// define path
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
  entry: APP_PATH,
  output: {
    path: BUILD_PATH,
    filename: 'antd-pro.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.less'],
    alias: {
      'assets': path.resolve(__dirname, 'src/assets'),
      'page': path.resolve(__dirname, 'src/page'),
      'components': path.resolve(__dirname, 'src/components'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'api': path.resolve(__dirname, 'src/api'),
      'style': path.resolve(__dirname, 'src/style'),
    }
  },
  // effective when use webpack-dev-server start
  devServer: {
    historyApiFallback: true,
    inline: true,
    progress: true,
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.(css|less)$/,
        use: [{
          loader: 'style-loader',
          options: {
            singleton: true
          }
        }, {
          loader: 'css-loader',
          options: {
            import: true
          }
        }, {
          loader: 'less-loader',
          options: {
              // modifyVars: {
              //   'primary-color': 'red', // 修改dbox-ui主题色
              // },
              javascriptEnabled: true,
          }
        }],
        // exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.(png|svg|jpg|gif|webp|ico)$/,
        use: [
           'file-loader'
         ],
         exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.(jsx|js)$/,
        use: 'eslint-loader',
        exclude: path.resolve(__dirname, 'node_modules')
      }
    ]
  }
};
