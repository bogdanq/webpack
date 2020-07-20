import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import { assetsByChunkName } from "../../dist/stats.json";

const app = express();

app.use(express.static("../../dist"));

const renderer = (req, store, context) => {
  const content = renderToString(<div>{renderRoutes(Routes)}</div>);

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" type="text/css" href="/${assetsByChunkName.main[0]}" />
      <title>Document</title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script src="/${assetsByChunkName.main[1]}"></script>
    </body>
  </html>`;
};

app.get("*", (req, res) => {
  const params = req.params[0].split("/");
  const id = params[2];

  const routes = [{ path: "/" }];
  const content = renderer(req, {}, {});

  res.send(content);
});

app.listen(3000, () => {
  console.log("Server on port 3000");
});
