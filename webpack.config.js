const { merge } = require("lodash");
const { createDefaultConfig } = require("./config/default");
const { createDevelopConfig } = require("./config/dev");
const { createProdactionConfig } = require("./config/prod");

module.exports = function defaultConfig(webpackEnv) {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";

  const config =
    process.env.NODE_ENV === "development"
      ? createDevelopConfig()
      : createProdactionConfig();

  return merge(createDefaultConfig(isEnvDevelopment, isEnvProduction), config);
};
