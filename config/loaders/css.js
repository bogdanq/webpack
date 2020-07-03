/**
 * @see https://www.npmjs.com/package/css-loader
 * Загрузчик css интерпретирует /@import/ и url () как import / require () и разрешает их.
 */

const isEnvDevelopment = process.env.NODE_ENV === "development";

const modulesConfig = {
  mode: "local",
  localIdentName: "[name]-[local]-[contenthash]",
  hashPrefix: "my-custom-hash",
};

module.exports = function cssLoader({ modules } = {}) {
  return {
    loader: "css",
    options: {
      sourceMap: isEnvDevelopment,
      modules: modules ? modulesConfig : false,
    },
  };
};
