const path = require("path");
const webpack = require("webpack");

module.exports = {
  devtool: "eval",
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:3030",
    "webpack/hot/only-dev-server",
    "./src/index",
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/static/",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    moduleDirectories: ["node_modules", "src"],
    extensions: ["", ".js", ".jsx", "scss"],
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ["babel"],
        include: path.join(__dirname, "src"),
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
