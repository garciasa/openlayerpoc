const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const config = {
  devtool: 'cheap-module-source-map',
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: false,
                discardComments: {
                  removeAll: true,
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer]
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEV__: true,
    }),
    new ExtractTextPlugin({
      filename: 'styles-bundle.css',
      allChunks: true,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        unused: true,
        dead_code: true,
        drop_console: true,
      },
      comments: false,
    }),
  ],
  resolve: {
    extensions: ['.scss', '.js'],
  },
};

module.exports = config;
