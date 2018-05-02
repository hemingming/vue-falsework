var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

const page = require('../configs')
const webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    vendor: page.vendor
  },
  output: {
    path: path.resolve(__dirname, '../static/js/lib/vendor'),
    filename: '[name].common.js',
    library: '[name]_common'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components')
    }
  },
  externals: {
    'Promise': 'window.Promise',
    'es6-promise': 'window.Promise',
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 500,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 500,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../manifest.json'),
      name: '[name]_common',
      context: __dirname
    }),
    new ExtractTextPlugin('[name].common.css'),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        context: path.resolve(__dirname, '../'),
        postcss: [require('autoprefixer')({ browsers: page.browsers })]
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    })
  ]
}
