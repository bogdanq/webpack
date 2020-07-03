/**
 * @see https://www.npmjs.com/package/file-loader
 * Загрузчик файлов преобразует import / require () для файла в URL и отправляет файл в выходной каталог.
 * Создаст файл в выходном каталоге с именем - хеш с расширением ресурса
 */

const path = require("path");

const PORT = process.env.PORT;
const isEnvDevelopment = process.env.NODE_ENV === "development";

module.exports = function fileLoader() {
  return {
    loader: "file",
    options: {
      name: (resourcePath, resourceQuery) => {
        if (isEnvDevelopment) {
          return "[path][name].[ext]";
        }

        return "[contenthash].[ext]";
      },
      publicPath: (url, resourcePath, context) => {
        if (isEnvDevelopment && PORT) {
          return `http://localhost:${PORT}/${url}`;
        }

        return path.resolve(__dirname, `../../dist/${url}`);
      },
    },
  };
};
