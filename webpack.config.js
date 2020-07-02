const path = require("path");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const {
  getStyleLoaders,
  getWebpackAliases,
  getFileLOaderConfig,
  paths,
} = require("./config/utils");

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const nodeModuleRegex = /node_modules/;
const imageRegex = /\.(png|jpe?g|gif)$/i;

module.exports = function defaultConfig(webpackEnv) {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";

  return {
    mode: process.env.NODE_ENV,
    entry: {
      // Точки входа, которые будут в dist
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

      // new webpack.DefinePlugin({
      //   // передать переменные
      //   NODE_ENV: JSON.stringify(NODE_ENV),
      // }),

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
            modules: {
              // getLocalIdent: getLocalIdent,
              mode: "local",
              // exportGlobals: true,
              // читаемое имя для дебага
              localIdentName: "[name]-[local]-[hash:base64:5]",
              // context: path.resolve(__dirname, "src"),
              hashPrefix: "my-custom-hash",
            },
          }),
        },

        {
          test: imageRegex,
          exclude: nodeModuleRegex,
          use: getFileLOaderConfig(),
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
  };
};
