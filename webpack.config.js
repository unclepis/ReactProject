const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader?modules']
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader?modules', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new DashboardPlugin(dashboard.setData),
    /*压缩优化代码结束*/
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:3000'
    }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: './App/',
    historyApiFallback: true,
    hot: true,
    quite: true,
    host: '0.0.0.0'
  }
}

