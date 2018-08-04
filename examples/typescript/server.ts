import * as express from "express";
import { join } from "path";
import { createServer } from "@gsox/server";
import { Ping, Notification } from './types';

const inject = [Ping, Notification];

const app = express();
app.use('/', express.static(join(__dirname)));
app.use('/static', express.static(join(__dirname, 'dist')));

createServer(app, { inject });