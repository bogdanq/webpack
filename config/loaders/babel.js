/**
 * @see https://www.npmjs.com/package/babel-loader
 * Загрузчик транспилирует код и тс в es5
 * конфиг бабеля в .babelrc
 */

module.exports = function babelLoader() {
  return {
    loader: "babel",
  };
};
