const TerserPlugin = require("terser-webpack-plugin");

/**
 * @see https://www.npmjs.com/package/terser-webpack-plugin
 */

const isEnvDevelopment = process.env.NODE_ENV === "production";

module.exports = new TerserPlugin({
  test: /\.js(\?.*)?$/i,
  exclude: /node_modules/,
  cache: true,
  cacheKeys: (defaultCacheKeys, file) => {
    defaultCacheKeys.myCacheKey = "myCacheKeyValue";
    return defaultCacheKeys;
  },
  parallel: 4,
  sourceMap: isEnvDevelopment,
  extractComments: true,
  terserOptions: {
    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
    output: {
      comments: /@license/i,
      comments: false,
    },
  },
});
