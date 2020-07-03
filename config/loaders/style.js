/**
 * @see https://www.npmjs.com/package/style-loader
 * Вставляет CSS в DOM
 */

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isEnvDevelopment = process.env.NODE_ENV === "development";

module.exports = function styleLoader() {
  return isEnvDevelopment
    ? {
        loader: "style",
      }
    : {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: path.resolve(__dirname, "../../dist"),
          hmr: isEnvDevelopment,
        },
      };
};
