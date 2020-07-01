const webpack = require("webpack");
const path = require("path");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || "development";

const devMode = NODE_ENV === "development";

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const nodeModuleRegex = /node_modules/;

const paths = [
  ["@ui", "ui/"],
  ["@features", "features/"],
];

const defaultConfig = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";

  return {
    mode: NODE_ENV,
    entry: {
      // ТОчки входа, которые будут в dist
      main: path.resolve(__dirname, "src/index.js"),
      // cabinet: path.resolve(__dirname, "src/root/pages/user-cabinet"),
    },
    output: {
      // разбить код на файлы
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    // devtool: 'eval', => по умолчанию
    devtool: "cheap-inline-module-source-map",
    // Масси в екземпляров классов
    optimization: {
      minimizer: [new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [
      //вырезать код для прода
      new HtmlWebpackPlugin({
        title: "hello webpack",
        template: path.resolve(__dirname, "public/index.html"),
        inject: true,
      }),
      new webpack.DefinePlugin({
        // передать переменные
        NODE_ENV: JSON.stringify(NODE_ENV),
      }),
      // минификация js файлов

      new MinifyPlugin({
        removeConsole: !isEnvDevelopment,
        removeDebugger: !isEnvDevelopment,
        deadcode: false, // def => true
      }),
      new MiniCssExtractPlugin({
        filename: isEnvDevelopment ? "[name].css" : "[name].[hash].css",
        chunkFilename: isEnvDevelopment ? "[id].css" : "[id].[hash].css",
        // ignoreOrder: false,
      }),
    ],

    module: {
      //лоадеры
      rules: [
        {
          test: /\.js$/, // => расширения
          exclude: nodeModuleRegex, // => исключить
          use: {
            // бабель плагины, обрабатывают код
            loader: "babel",
            // options: {
            //   // Можно указать в babelrc
            //   presets: ["@babel/preset-env", "@babel/preset-react"],
            // },
          },
        },
        {
          test: cssRegex,
          exclude: [cssModuleRegex, nodeModuleRegex],
          use: getStyleLoaders({
            sourceMap: isEnvDevelopment,
            // sideEffects: true,
          }),
        },
        {
          test: cssModuleRegex,
          exclude: nodeModuleRegex,
          use: getStyleLoaders({
            sourceMap: isEnvDevelopment,
            modules: getModulesConfig(),
          }),
        },
      ],
    },

    // указать где искать лоадеры
    resolve: {
      modules: ["node_modules"],
      extensions: [".js", ".ts", ".tsx"],
      alias: getWebpackAliases({
        baseUrl: "src",
        paths,
      }),
    },
    // указать где искать лоадеры и префикс loader убрать
    resolveLoader: {
      modules: ["node_modules"],
      // что бы не писать приставку loader лоадерам
      moduleExtensions: ["-loader"],
      extensions: [".js"],
    },
    // devServer: createDevServerConfig(),
  };
};

module.exports = defaultConfig;

function getModulesConfig() {
  return {
    // getLocalIdent: getLocalIdent,
    mode: "local",
    // exportGlobals: true,
    // читаемое имя для дебага
    localIdentName: "[name]-[local]-[hash:base64:5]",
    // context: path.resolve(__dirname, "src"),
    hashPrefix: "my-custom-hash",
  };
}

function getStyleLoaders(cssOptions = {}) {
  const loaders = [
    {
      loader: devMode
        ? "style"
        : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, "dist"),
            },
          },
    },
    {
      loader: "css",
      options: cssOptions,
    },
  ];

  return loaders;
}

function getWebpackAliases(options = {}) {
  const { baseUrl, paths } = options;

  if (!baseUrl) {
    return {};
  }

  const result = paths.reduce((acc, [key, value]) => {
    acc[key] = path.resolve(__dirname, `${baseUrl}/${value}`);
    return acc;
  }, {});

  return result;
}
