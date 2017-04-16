var webpack = require("webpack");

module.exports = {
  entry: [
    "./app.js",
  ],
  output: {
    filename: 'app.js',
    publicPath: 'build/',
  },
  devtool: '#eval-source-map',
};
