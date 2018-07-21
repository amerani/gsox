import * as express from "express";
import { createServer } from "../packages/gsox-server";

const app = express();
createServer(app, {
      host: "localhost",
      port: "3000",
}, {
      graphql: "/graphql",
      webhook: "/webhook",
});
