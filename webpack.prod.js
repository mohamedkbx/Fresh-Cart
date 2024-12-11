const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    index: "./scripts/index.js",
    login: "./scripts/login.js",
  },
  mode: "production",
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 5000,
    hot: true,
    historyApiFallback: true, // Enable single-page application routing
    open: true, // Automatically opens the browser
    historyApiFallback: {
      index: "./pages/login.html",
    },
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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
    filename: "[name].bundle.js",
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
      chunks: ["login"],
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
