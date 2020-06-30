const webpack = require("webpack");
const path = require("path");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || "development";
const devMode = NODE_ENV === "development";

module.exports = {
  mode: NODE_ENV,
  entry: {
    // ТОчки входа, которые будут в dist
    main: path.resolve(__dirname, "src/root/home"),
    cabinet: path.resolve(__dirname, "src/root/pages/user-cabinet"),
  },
  output: {
    // разбить код на файлы
    filename: "[name].js",
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
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    //вырезать код для прода
    new HtmlWebpackPlugin({
      title: "hello webpack",
      template: path.resolve(__dirname, "src/public/index.html"),
      inject: true,
    }),
    new webpack.DefinePlugin({
      // передать переменные
      NODE_ENV: JSON.stringify(NODE_ENV),
      LANG: JSON.stringify("ru"),
    }),
    // минификация js файлов
    new MinifyPlugin({
      // removeConsole: true,
      removeDebugger: true,
      deadcode: false, // def => true
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
      ignoreOrder: false,
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
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/, // => исключить
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, "dist"),
              hmr: NODE_ENV === "development",
            },
          },
          // "style", // dev mode
          "css",
          "sass",
        ],
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
};
