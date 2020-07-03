/**
 * @see https://www.npmjs.com/package/postcss-loader
 * Загрузчик для веб-пакета для обработки CSS с PostCSS
 */

const isEnvDevelopment = process.env.NODE_ENV === "development";

module.exports = function postCssLoader() {
  return {
    loader: "postcss",
    options: {
      sourceMap: isEnvDevelopment,
      // exec: true,
      ident: "postcss",
      // importLoaders: 1,
      plugins: [require("autoprefixer")({})],
      config: {
        ctx: {
          cssnano: {},
        },
      },
    },
  };
};
