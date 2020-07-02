// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";
process.env.PORT = 3000;

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
  throw err;
});

// Ensure environment variables are read.
require("../config/env");

const path = require("path");
const fs = require("fs");
const chalk = require("react-dev-utils/chalk");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const clearConsole = require("react-dev-utils/clearConsole");
const checkRequiredFiles = require("react-dev-utils/checkRequiredFiles");
const {
  choosePort,
  createCompiler,
  prepareUrls,
} = require("react-dev-utils/WebpackDevServerUtils");
const openBrowser = require("react-dev-utils/openBrowser");
const { checkBrowsers } = require("react-dev-utils/browsersHelper");
const paths = require("../config/paths");
const configFactory = require("../webpack.config");

const useYarn = fs.existsSync(paths.yarnLockFile);
const isInteractive = process.stdout.isTTY;

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  );
  console.log(
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`
  );
  console.log(
    `Learn more here: ${chalk.yellow("http://bit.ly/CRA-advanced-config")}`
  );
  console.log();
}

const KILL_SIGNALS = ["SIGINT", "SIGTERM"];

checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    return choosePort(HOST, DEFAULT_PORT);
  })
  .then((port) => {
    if (port == null) {
      return;
    }
    const config = configFactory("development");
    const protocol = process.env.HTTPS === "true" ? "https" : "http";
    const appName = require(paths.appPackageJson).name;
    const urls = prepareUrls(protocol, HOST, port);

    const compiler = createCompiler({
      webpack,
      config,
      appName,
      urls,
      useYarn,
    });

    const serverConfig = createDevServerConfig();
    const devServer = new WebpackDevServer(compiler, serverConfig);

    devServer.listen(port, HOST, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      if (isInteractive && !process.env.NO_CLEAR) {
        clearConsole();
      }
      console.log(chalk.cyan("Starting the development server...\n"));
      openBrowser(urls.localUrlForBrowser);
    });

    KILL_SIGNALS.forEach((sig) => {
      process.on(sig, () => {
        devServer.close();
        process.exit();
      });
    });
  })
  .catch((error) => {
    if (error && error.message) {
      console.log(error.message);
    }
    process.exit(1);
  });

function createDevServerConfig() {
  return {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    clientLogLevel: "none",
    port: 3000,
    hot: true,
    progress: true,
    // injectClient: false,
    watchOptions: {
      //времеожидания после изменения, после которого вебпак не выполняет сборку
      aggregateTimeout: 200,
      // интервал опроса
      // poll: 1000,
      ignored: /node_modules/,
    },
  };
}
