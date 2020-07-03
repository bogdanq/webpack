const { createDefaultConfig } = require("./config/default");

module.exports = function defaultConfig(webpackEnv) {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";

  return createDefaultConfig(isEnvDevelopment, isEnvProduction);
};
