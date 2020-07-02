const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const createDevelopConfig = () => {
  return {
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      }),
      new HtmlWebpackPlugin({
        title: "hello webpack",
        template: path.resolve(__dirname, "../public/index.html"),
        inject: true,
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
    ],
  };
};

module.exports = { createDevelopConfig };
