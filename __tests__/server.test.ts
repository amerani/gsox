import * as express from "express";
import * as http from "http";
import "reflect-metadata";
import { createClient } from "../packages/gsox-client";
import { Ping } from "../packages/gsox-schema";
import { createServer } from "../packages/gsox-server";
import { Notification } from "./Notification";

const port = 5000;
const inject = [Notification];
let server;
let client;
beforeAll(() => {
      const app = express();
      server = createServer(app, { port, inject });
      client = createClient({ port });
      server.listen(() => "Server ready");
});

afterAll(() => {
      server.close();
});

test("should connect", () => {
      expect(server).not.toBeNull();
});

test("should ping", (done) => {
      client
      .subscribe(Ping)
      .subscribe({
            next({data: {Ping}}) {
                  expect(parseInt(Ping.id)).toBe(0);
                  done();
            },
      });
});
