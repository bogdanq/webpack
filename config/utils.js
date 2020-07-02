const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV === "development";

function getStyleLoaders(cssOptions = {}) {
  const development = [{ loader: "style" }];

  const production = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: path.resolve(__dirname, "../dist"),
        hmr: devMode,
      },
    },
  ];

  const loaders = [
    {
      loader: "css",
      options: cssOptions,
    },
  ];

  if (devMode) {
    return loaders.concat(development).reverse();
  }

  return loaders.concat(production).reverse();
}

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

function getFileLOaderConfig() {
  return {
    loader: "file",
    options: {
      name: (resourcePath, resourceQuery) => {
        if (devMode) {
          return "[path][name].[ext]";
        }

        return "[contenthash].[ext]";
      },

      publicPath: (url, resourcePath, context) => {
        if (devMode && process.env.PORT) {
          return `http://localhost:${process.env.PORT}/${url}`;
        }

        return path.resolve(__dirname, `../dist/${url}`);
      },
    },
  };
}

const paths = [
  ["@ui", "ui/"],
  ["@features", "features/"],
  ["@assets", "assets/"],
];

module.exports = {
  getWebpackAliases,
  getStyleLoaders,
  getFileLOaderConfig,
  devMode,
  paths,
};
