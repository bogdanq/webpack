const path = require("path");

const HtmlWebpackPlugin = require("./plugins/HtmlWebpackPlugin");
const MiniCssExtractPlugin = require("./plugins/MiniCssExtractPlugin");
const OptimizeCSSAssetsPlugin = require("./plugins/OptimizeCSSAssetsPlugin");
const TerserPlugin = require("./plugins/TerserPlugin");

const cssLoader = require("./loaders/css");
const styleLoader = require("./loaders/style");
const postCssLoader = require("./loaders/postcss");
const babelLoader = require("./loaders/babel");
const fileLoader = require("./loaders/file");

const webpackParts = require("./part");
const resolvePart = require("./part/resolve");

const cssRegex = /\.css$/;
const tsRegex = /\.ts(x?)$/;
const cssModuleRegex = /\.module\.css$/;
const nodeModuleRegex = /node_modules/;
const imageRegex = /\.(png|jpe?g|gif)$/i;

const createDefaultConfig = (isEnvDevelopment) => ({
  mode: process.env.NODE_ENV,
  ...webpackParts(isEnvDevelopment),
  devtool: "cheap-inline-module-source-map",
  resolve: resolvePart(),
  optimization: {
    minimize: true,
    minimizer: [OptimizeCSSAssetsPlugin, TerserPlugin],
    // removeAvailableModules: false,
    // removeEmptyChunks: false,
    // splitChunks: false,
  },
  plugins: [HtmlWebpackPlugin, MiniCssExtractPlugin],
  module: {
    rules: [
      {
        test: tsRegex,
        exclude: nodeModuleRegex,
        include: path.resolve(__dirname, "../src"),
        use: babelLoader,
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
  resolveLoader: {
    modules: ["node_modules"],
    moduleExtensions: ["-loader"],
    extensions: [".js"],
  },
});

module.exports = { createDefaultConfig };
