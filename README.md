# webpack

      npm i @babel/core @babel/preset-env babel-loader -D

## Точка входа

Это js файл, содержит все импорты

## Точка выводы

Это /build или /dist, папка, где будет размещшен конечный бандл

## Загрузчики

В основном компилируют или транспилируют код.

## Плагины

Играют важную роль в выводе кода в файлы

## CSS

      npm i mini-css-extract-plugin (prodaction) css-loader style-loader (develop) -D

optimize-css-assets-webpack-plugin - минификация кода
node-sass, sass-loader

## HTML

html-webpack-plugin

## server

webpack-dev-server
"start": "webpack-dev-server --open",
