/**
 * Сборщик имеет точку входа (entry) и точку выхода (output)
 */

const path = require("path");

module.exports = function webpackParts(isEnvDevelopment) {
  return {
    entry: {
      main: path.resolve(__dirname, "../../src/client/index.tsx"),
    },
    output: {
      filename: isEnvDevelopment
        ? "[name].bundle.js"
        : "[name].[contenthash].bundle.js",
      path: path.resolve(__dirname, "../../dist"),
    },
  };
};
