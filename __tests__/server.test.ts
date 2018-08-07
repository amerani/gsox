import * as express from "express";
import "reflect-metadata";
import { createClient } from "../packages/gsox-client";
import { Ping } from "../packages/gsox-schema";
import { applyMiddleware } from "../packages/gsox-server";
import { Notification } from "./Notification";

const port = 4000;
const inject = [Notification];
let server;
let client;
beforeAll(() => {
      const app = express();
      server = applyMiddleware(app, { port, inject });
      const { host, routes } = server;
      client = createClient({ port, host, routes, ws: null });
      server.listen(() => console.log("server listening..."));
});

afterAll(() => {
      server.close();
});

test("should connect", () => {
      expect(server).not.toBeNull();
});

test("should ping", (done) => {
      client
      .subscribe(Ping, {
            next({data: {Ping}}) {
                  expect(parseInt(Ping.id)).toBe(0);
                  done();
            },
      });
});
