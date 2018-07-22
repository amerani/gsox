import * as express from "express";
import { createServer } from "../packages/gsox-server";
import * as React from "react";
import { DataProvider } from "../packages/gsox-client/lib";
import ReactDOMServer from "react-dom/server";

const app = express();
createServer(app, {
      host: "localhost",
      port: "3000",
}, {
      graphql: "/graphql",
      webhook: "/webhook",
});

app.get('/client', (req, res) => {
      res.send(ReactDOMServer.renderToNodeStream(React.createElement(DataProvider)));
})