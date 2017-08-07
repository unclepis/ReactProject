const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader?modules'] //增加modules就会加载css module，在css文件中就会有全局的global变量和局部变量的区别
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader?modules', 'sass-loader']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin({ // 解压bundle.js
      uglifyOptions: {
        compress: {
          warnings: false
        }
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new DashboardPlugin(dashboard.setData),
    /*压缩优化代码结束*/
    new HtmlWebpackPlugin({
      title: 'webpack-demos', // 设置标题
      filename: 'index.html', // 设置文件名
      template: path.join(__dirname, './index.html'), // 设置文件的路径
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:3000' // 在指定的3000端口自动打开浏览器
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

