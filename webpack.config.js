const { createDefaultConfig } = require("./config/default");
const prodConfig = require("./config/prod");

module.exports = function defaultConfig(webpackEnv) {
  const isEnvDevelopment = process.env.NODE_ENV === "development";
  const isEnvProduction = process.env.NODE_ENV === "production";

  if (isEnvProduction) {
    return prodConfig;
  }

  return createDefaultConfig(isEnvDevelopment, isEnvProduction);
};
