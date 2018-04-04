const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// import path from 'path';

module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, 'client/src/index'),

  output: {
    path: path.join(__dirname, 'dist-client'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  target: 'web',
  devServer: {
    contentBase: '/dist-client',
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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false,
      },
      minimize: true,
      sourceMap: true
    }),
    new ExtractTextPlugin('./css/styles.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        SECRET: JSON.stringify(process.env.SECRET),
        CLOUDINARY_PRESET: JSON.stringify(process.env.CLOUDINARY_PRESET)
      }
    }),
    new HtmlWebpackPlugin({
      template: './client/src/index.html',
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    })
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
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
    extensions: ['.jsx', '.js', '.css']
  },

  node: {
    fs: 'empty'
  }
};
