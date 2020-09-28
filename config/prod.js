const path = require("path");
const webpack = require("webpack");

const { StatsWriterPlugin } = require("webpack-stats-plugin");

const OptimizeCSSAssetsPlugin = require("./plugins/OptimizeCSSAssetsPlugin");
const TerserPlugin = require("./plugins/TerserPlugin");
const fileLoader = require("./loaders/file");

const HtmlWebpackPlugin = require("./plugins/HtmlWebpackPlugin");
const MiniCssExtractPlugin = require("./plugins/MiniCssExtractPlugin");

const cssLoader = require("./loaders/css");
const styleLoader = require("./loaders/style");
const postCssLoader = require("./loaders/postcss");

const resolvePart = require("./part/resolve");
const webpackParts = require("./part");

const cssRegex = /\.css$/;
const tsRegex = /\.ts(x?)$/;
const cssModuleRegex = /\.module\.css$/;
const nodeModuleRegex = /node_modules/;
const imageRegex = /\.(png|jpe?g|gif)$/i;

const isEnvDevelopment = false;

const t = {
  mode: process.env.NODE_ENV,
  ...webpackParts(isEnvDevelopment),
  // devtool: 'eval', => по умолчанию
  devtool: "cheap-inline-module-source-map",
  // указать где искать лоадеры
  resolve: resolvePart(),
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    HtmlWebpackPlugin,
    MiniCssExtractPlugin,
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new StatsWriterPlugin({
        stats: {
          all: false,
          assets: true,
        },
      }),
      OptimizeCSSAssetsPlugin,
      TerserPlugin,
    ],
  },
  module: {
    //лоадеры
    rules: [
      // {
      //   test: /\.(jpeg|jpg|png)$/,
      //   use: {
      //     loader: "url",
      //   },
      // },
      {
        test: tsRegex,
        exclude: nodeModuleRegex,
        include: path.resolve(__dirname, "../src"),
        use: [
          { loader: "babel" },
          { loader: "ts-loader", options: { happyPackMode: true } },
        ],
      },
      {
        test: cssRegex,
        exclude: [cssModuleRegex, nodeModuleRegex],
        use: [styleLoader(), cssLoader(), postCssLoader()],
      },
      {
        test: cssModuleRegex,
        exclude: nodeModuleRegex,
        use: [styleLoader(), cssLoader({ modules: true }), postCssLoader()],
      },
      {
        test: imageRegex,
        exclude: nodeModuleRegex,
        use: fileLoader,
      },
    ],
  },
  // указать где искать лоадеры и префикс loader убрать
  resolveLoader: {
    modules: ["node_modules"],
    // что бы не писать приставку loader лоадерам
    moduleExtensions: ["-loader"],
    extensions: [".js"],
  },
};

module.exports = t;
