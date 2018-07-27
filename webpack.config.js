const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require( 'path' );
const webpack = require( 'webpack' );
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var isProp = process.env.NODE_ENV === 'production';

var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProp = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  loader: ['css-loader', 'sass-loader'],
  publicPath: '/public'
})
var cssConfig = isProd ? cssProd : cssDev;

module.exports = ( env, options ) => {
  return {
    entry: './src/Ap.js',

    output: {
      path: path.resolve( __dirname, 'build' ),
      filename: 'block.js',
    },

    devtool: 'cheap-eval-source-map',

    module: {
      rules: [
        {
          test: /\.jsx$|\.es6$|\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['react'],
            }
          },
          exclude: /(node_modules|bower_components)/
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: ( options.mode == 'production' ? true : false ),
                sourceMap: true,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [ require( 'autoprefixer' ) ]
              }
            },
          ],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'images/'
              }
            }
          ]
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style.css',
        chunkFilename: '[id].css'
      })
    ],

  }
};