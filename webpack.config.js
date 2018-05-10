var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
 module.exports = {
     entry: './src/index.js',
     output: {
         path: path.resolve(__dirname, 'dist'),
         filename: 'lyrics.js'
     },
     module: {
         rules: [
             {
                 test: /\.js$/,
                 exclude: /(node_modules|bower_components)/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     plugins: [
        new HtmlWebpackPlugin({
          template:"./src/demo.html",
          filename:"index.html"
        })
      ],
     devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        progress:true
      },
     devtool: 'source-map'
 };