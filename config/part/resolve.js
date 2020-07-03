/**
 * В этом обьекте описание алиасов и файлов, которые нужно обрабатывать
 */

const { getWebpackAliases, paths } = require("../utils");

module.exports = function resolvePart(isEnvDevelopment) {
  return {
    modules: ["node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: getWebpackAliases({
      baseUrl: "src",
      paths,
    }),
  };
};
