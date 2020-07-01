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

const defaultConfig = {
  mode: NODE_ENV,
  entry: {
    // ТОчки входа, которые будут в dist
    main: path.resolve(__dirname, "src/index.js"),
    // cabinet: path.resolve(__dirname, "src/root/pages/user-cabinet"),
  },
  output: {
    // разбить код на файлы
    filename: "[name].bundle.js",
    //сделать глобальную переменную
    library: "home",
    path: path.resolve(__dirname, "dist"),
  },
  //Будет слушать файлы
  watch: NODE_ENV === "development",
  watchOptions: {
    //времеожидания после изменения, после которого вебпак не выполняет сборку
    aggregateTimeout: 100,
  },
  // devtool: 'eval', => по умолчанию
  devtool: "cheap-inline-module-source-map",
  // Масси в екземпляров классов
  optimization: {
    minimizer: devMode ? [] : [new OptimizeCSSAssetsPlugin({})],
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
      removeConsole: !devMode,
      removeDebugger: !devMode,
      deadcode: false, // def => true
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
      // ignoreOrder: false,
    }),
  ],

  module: {
    //лоадеры
    rules: [
      {
        test: /\.js$/, // => расширения
        exclude: /node_modules/, // => исключить
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
        exclude: [cssModuleRegex, /node_modules/],
        use: getStyleLoaders(),
      },
      {
        test: cssModuleRegex,
        exclude: /node_modules/,
        use: getStyleLoaders({
          sourceMap: devMode,
          modules: getModulesConfig(),
        }),
      },
    ],
  },

  // указать где искать лоадеры
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      "@app": path.resolve(__dirname, "src/"),
      "@ui": path.resolve(__dirname, "src/ui"),
      "@features": path.resolve(__dirname, "src/features"),
    },
  },

  // указать где искать лоадеры и префикс loader убрать
  resolveLoader: {
    modules: ["node_modules"],
    // что бы не писать приставку loader лоадерам
    moduleExtensions: ["-loader"],
    extensions: [".js"],
  },

  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    port: 8080,
    hot: true,
    liveReload: true,
    watchContentBase: true,
    progress: true,
  },
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

// [
//   devMode
//     ? "style"
// : {
//     loader: MiniCssExtractPlugin.loader,
//     options: {
//       publicPath: path.resolve(__dirname, "dist"),
//     },
//   },
//   {
//     loader: "css",
//     options: {
//       // стили применены к конкретному компоненту
//       modules: {
//         // getLocalIdent: getLocalIdent,
//         mode: "local",
//         // exportGlobals: true,
//         // читаемое имя для дебага
//         localIdentName: "[name]-[local]-[hash:base64:5]",
//         // context: path.resolve(__dirname, "src"),
//         hashPrefix: "my-custom-hash",
//       },
//       // генерация source map
//       sourceMap: devMode,
//     },
//   },
//   // "sass",
// ],
