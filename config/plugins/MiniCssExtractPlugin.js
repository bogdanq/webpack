const MiniCssExtractPlugin = require("mini-css-extract-plugin");
/**
 * @see https://www.npmjs.com/package/mini-css-extract-plugin
 * Создает файл css
 */

const isEnvDevelopment = process.env.NODE_ENV === "production";

module.exports = new MiniCssExtractPlugin({
  filename: isEnvDevelopment ? "[name].[contenthash].css" : "[name].css",
  chunkFilename: isEnvDevelopment ? "[id].[contenthash].css" : "[id].css",
});
