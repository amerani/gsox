import * as express from "express";
import { join } from "path";
import { applyMiddleware } from "@gsox/server";
import { inject, routes, host, port } from "./config";

const app = express();

app.use('/', express.static(join(__dirname)));
app.use('/static', express.static(join(__dirname, 'dist')));

const server = applyMiddleware(app, { host, port, routes, inject });

server.listen(() => console.log(`
🧦 gsox server started 🧦
http://${host}:${port}${routes.webhook}
ws://${host}:${port}${routes.graphql}
`));