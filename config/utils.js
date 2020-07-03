const path = require("path");

function getWebpackAliases(options = {}) {
  const { baseUrl, paths } = options;

  if (!baseUrl) {
    return {};
  }

  const result = paths.reduce((acc, [key, value]) => {
    acc[key] = path.resolve(__dirname, `../${baseUrl}/${value}`);
    return acc;
  }, {});

  return result;
}

const paths = [
  ["@ui", "ui/"],
  ["@features", "features/"],
  ["@assets", "assets/"],
  ["@pages", "pages/"],
];

module.exports = {
  getWebpackAliases,
  paths,
};
