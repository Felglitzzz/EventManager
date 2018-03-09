const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

// import path from 'path';

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: path.join(__dirname, 'client/src/index'),

  output: {
    path: path.join(__dirname, 'client/src'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  target: 'web',
  devServer: {
    contentBase: path.join(__dirname, 'client/src'),
    historyApiFallback: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
    new Dotenv()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: [
          /node_modules/
        ],
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['env', 'react']
            }
          },
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '/'
            }
          }
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: './'
            }
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js', '.scss']
  },

  node: {
    fs: 'empty'
  }
};
