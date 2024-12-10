const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./scripts/index.js",
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 5000,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][ext]",
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "./index.html",
      favicon: "./assets/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      template: "./template.html",
      filename: "template.html",
      favicon: "./assets/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      template: "./pages/login.html",
      filename: "login.html",
      favicon: "./assets/favicon.ico",
    }),
  ],
};
