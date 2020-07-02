const path = require("path");
const {
  getStyleLoaders,
  getWebpackAliases,
  getFileLOaderConfig,
  paths,
} = require("./utils");

const cssRegex = /\.css$/;
const tsRegex = /\.ts(x?)$/;
const cssModuleRegex = /\.module\.css$/;
const nodeModuleRegex = /node_modules/;
const imageRegex = /\.(png|jpe?g|gif)$/i;

const createDefaultConfig = (isEnvDevelopment) => ({
  mode: process.env.NODE_ENV,
  entry: {
    // Точки входа, которые будут в dist
    main: path.resolve(__dirname, "../src/index.tsx"),
  },
  output: {
    // разбить код на файлы
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist"),
  },
  // devtool: 'eval', => по умолчанию
  devtool: "cheap-inline-module-source-map",
  // указать где искать лоадеры
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: getWebpackAliases({
      baseUrl: "src",
      paths,
    }),
  },
  module: {
    //лоадеры
    rules: [
      {
        test: tsRegex,
        exclude: nodeModuleRegex,
        include: path.resolve(__dirname, "../src"),
        use: [
          { loader: "babel" },
          { loader: "ts-loader", options: { happyPackMode: true } },
        ],
      },
      {
        test: cssRegex,
        exclude: [cssModuleRegex, nodeModuleRegex],
        use: getStyleLoaders({
          sourceMap: isEnvDevelopment,
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
  // указать где искать лоадеры и префикс loader убрать
  resolveLoader: {
    modules: ["node_modules"],
    // что бы не писать приставку loader лоадерам
    moduleExtensions: ["-loader"],
    extensions: [".js"],
  },
});

module.exports = { createDefaultConfig };
