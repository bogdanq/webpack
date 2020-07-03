/**
 * @see https://www.npmjs.com/package/html-webpack-plugin
 * Плагин, который упрощает создание HTML-файлов для обслуживания ваших пакетов
 * Интегрирует все подключения в переданный шаблон
 */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isEnvDevelopment = process.env.NODE_ENV === "production";

const minifyOptions = isEnvDevelopment
  ? {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    }
  : {};

module.exports = new HtmlWebpackPlugin({
  filename: isEnvDevelopment ? "index.[contenthash].html" : "index.html",
  template: path.resolve(__dirname, "../../public/index.html"),
  inject: true,
  cache: !isEnvDevelopment,
  showErrors: !isEnvDevelopment,
  minify: minifyOptions,
});
