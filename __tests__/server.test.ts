import * as express from "express";
import "reflect-metadata";
import { createClient } from "@gsox/client";
import { Ping } from "@gsox/schema";
import { applyMiddleware } from "@gsox/server";
import { Notification } from "./Notification";

const port = 4000;
const inject = [Notification];
let server;
let client;
beforeAll(() => {
      const app = express();
      server = applyMiddleware(app, { port, inject });
      const { host, routes } = server;
      client = createClient({ port, host, routes, ws: null, inject: [Ping, ...inject] });
      server.listen(() => console.log("server listening..."));
});

afterAll(() => {
      server.close();
});

test("should connect", () => {
      expect(server).not.toBeNull();
});

test('should init client', () => {
      expect(client).not.toBeNull();
})

test("should ping", (done) => {
      client
      .subscribe(Ping, {
            next({data: {Ping}}) {
                  expect(parseInt(Ping.id)).toBe(0);
                  done();
            },
      });
});
