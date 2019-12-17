const webpack = require('webpack')
const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  mode: NODE_ENV,
  entry: {
    main: path.resolve(__dirname, './src/rootson/home'),
    cabinet: path.resolve(__dirname, './src/rootson/pages/user-cabinet'),
  },
  output: {
    filename: '[name].js',
    //сделать глобальную переменную
    library: 'home',
    path: path.resolve(__dirname, 'dist'),
  },
  //Будет слушать файлы
  watch: NODE_ENV === 'development',
  watchOptions: {
    //времеожидания после изменения, после которого вебпак не выполняет сборку
    aggregateTimeout: 100,
  },

  // devtool: 'eval', => по умолчанию
  devtool: 'cheap-inline-module-source-map',
  // Масси в екземпляров классов
  plugins: [
    //вырезать код для прода
    new webpack.DefinePlugin({
      // передать переменные
      NODE_ENV: JSON.stringify(NODE_ENV),
      LANG: JSON.stringify('ru'),
    }),
    // минификация js файлов
    new MinifyPlugin({
      // removeConsole: true,
      removeDebugger: true,
      deadcode: false, // def => true
    }),
    // создать глобально переменную для проекта
    new webpack.ProvidePllugin({
      $: 'jquery',
    }),
  ],

  module: {
    //лоадеры
    rules: [
      {
        test: /\.js$/, // => расширения
        exclude: /node_modules/, // => исключить
        use: {
          loader: 'babel',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },

  // указать где искать лоадеры
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@app': path.resolve(__dirname, 'src/'),
      '@ui': path.resolve(__dirname, 'src/ui'),
      '@features': path.resolve(__dirname, 'src/features'),
    },
  },

  // указать где искать лоадеры и префикс loader убрать
  resolveLoader: {
    modules: ['node_modules'],
    moduleExtensions: ['-loader'],
    extensions: ['.js'],
  },
}
