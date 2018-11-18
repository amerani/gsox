import * as express from "express";
import "reflect-metadata";
import { createClient } from "@gsox/client";
import { Ping } from "@gsox/schema";
import { applyMiddleware } from "@gsox/server";
import { Notification } from "./Notification";
import * as getPort from "get-port";

const inject = [Notification];
let server;
let client;
let port;
beforeAll(async (done) => {
      port = await getPort();
      const app = express();
      server = applyMiddleware(app, { port, inject });
      const { host, routes } = server;
      client = createClient({ port, host, routes, ws: null, inject: [Ping, ...inject] });
      server.listen(() => console.log("server listening..."));
      done();
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
