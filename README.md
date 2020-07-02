# webpack

      npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader
      css-loader webpack webpack-cli style-loader webpack-dev-server file-loader del-cli
      typescript ts-loader terser-webpack-plugin

Выполняет loaders в обратном порядке, с последнего до первого. Работает в два режима: prodaction, который создает оптимизированные файл, и development, который создает читаемый код. Флаг `--mode` позволяет выбрать режим.

- webpack-cli - работа с Webpack из командной строки
- webpack - сборка модулей
- Loaders отвечают за загрузку и обьединение исходных файлов

## Точка входа

Это js файл, содержит все импорты

## Точка выводы

Это /build или /dist, папка, где будет размещшен конечный бандл

## Загрузчики

В основном компилируют или транспилируют код.

## Плагины

Играют важную роль в выводе кода в файлы

- copy-webpack-plugin (CopyWebpackPlugin) - копирует файлы и дериктории в билд дерикторию
  [ext] - расширение файла
  [path] - путь до ресурса относительно конфига
  [name] - имя файла / ресурса
  [contenthash] - метод хеширования
  [publicPath] - путь до dist

## CSS

      npm i mini-css-extract-plugin (prodaction) css-loader style-loader (develop) -D

optimize-css-assets-webpack-plugin - минификация кода
node-sass, sass-loader - лоадеры стилей

- css-loader - для загрузки и обьединения всех css файлов
- style-loader - добавит все стили внутрь тега style
- postcss-loader - применяет autoprefixer к CSS
- typings-for-css-modules-loader - лоадер для модулей тс

## HTML

html-webpack-plugin - лоадер для html

## server

      webpack-dev-server --save-dev

"start": "webpack-dev-server --open",

## Babel

Для того чтобы React работал, необходимо вместе с ним установить Babel. Он поможет в транспайлинге ES6 и JSX в ES5.

      npm i @babel/core @babel/preset-env babel-loader @babel/preset-react -D

- @babel/core - преобразует код ES6 в ES5
- babel-loader - помощник Webpacj для транспайлинга кода, задает пресеты
- babel-preset-env - пресет, который помогает babel конвертировать код в Es5
- babel-preset-react - пресет, преобразующий JSX в JS
