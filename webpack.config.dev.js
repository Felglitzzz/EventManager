const path = require('path');
// import path from 'path';

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: './client/src/index.js',
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
              publicPath: './'
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
  }
};
