const path = require("path");
const { merge } = require("lodash");
const webpackNodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

const { createDefaultConfig } = require("./default");

const baseConfig = createDefaultConfig();

module.exports = merge(baseConfig, {
  mode: "production",
  target: "node",
  entry: path.resolve(__dirname, "../src/server"),
  externals: [webpackNodeExternals()],
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "../dist"),
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
});
