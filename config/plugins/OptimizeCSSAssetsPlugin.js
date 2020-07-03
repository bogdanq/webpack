const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const safePostCssParser = require("postcss-safe-parser");
const cssnano = require("cssnano");

/**
 * @see https://www.npmjs.com/package/optimize-css-assets-webpack-plugin
 * Плагин для оптимизации и минимизации ресурсов
 */

module.exports = new OptimizeCSSAssetsPlugin({
  cssProcessorOptions: {
    parser: safePostCssParser, // default cssnano
    map: process.env.NODE_ENV === "development",
  },
  cssProcessor: cssnano,
  cssProcessorPluginOptions: {
    preset: [
      "default",
      {
        minifyFontValues: { removeQuotes: false },
        discardComments: { removeAll: true },
      },
    ],
  },
});
