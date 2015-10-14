var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var postcssImport = require('postcss-import');

var webpackPlugins = [
  new ExtractTextPlugin("style.css", {disable: false})
];

var postcssPlugins = [
  require('postcss-custom-properties'),
];

var filename = "markdown-textarea.js";
var publicPath = "/build/";
if (process.env.PRODUCTION) {
  webpackPlugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  entry: [
    "./app.js",
    "./lib/style.css",
  ],

  output: {
    path: __dirname + publicPath,
    filename: filename,
    publicPath: publicPath,
  },

  module: {
    loaders: [
      {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!postcss-loader")}
    ]
  },

  plugins: webpackPlugins,

  postcss: function () {
    // use webpack context
    postcssPlugins.unshift(postcssImport({
      onImport: function (files) {
        files.forEach(this.addDependency);
      }.bind(this)
    }));
    return postcssPlugins;
  },

  devtool: "#source-map",
};
