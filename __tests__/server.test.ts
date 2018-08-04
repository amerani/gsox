import * as express from "express";
import * as http from "http";
import "reflect-metadata";
import { createClient } from "../packages/gsox-client";
import { createServer } from "../packages/gsox-server";
import { Notification } from "./Notification";
import { Ping } from "../packages/gsox-schema";

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

test("should subscribe", (done) => {
      const testData = {
            Notification: {
                  type: "test_email",
                  id: 99,
            },
            typeName: "Notification"
      };
      client
      .subscribe(Notification)
      .subscribe({
            next({data}) {
                  expect(data.Notification.id).toBe(testData.Notification.id);
                  done();
            },
            error(e) { expect(e).toBeNull(); done(); },
      });

      setTimeout(() => {
            const req = http.request({
                  hostname: "localhost", port,
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  path: "/gsox/webhook",
            });
            req.write(Buffer.from(JSON.stringify(testData)));
            req.end();
      }, 1000);
}, 20000);
