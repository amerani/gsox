import * as express from "express";
import * as http from "http";
import "reflect-metadata";
import { createClient } from "../packages/gsox-client";
import { applyMiddleware } from "../packages/gsox-server";
import { Alert } from "./Alert";

const port = 6000;
const inject = [Alert];
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

test("should subscribe", (done) => {
      const testData = {
            Alert: {
                  type: "test",
                  id: 99,
            },
            typeName: "Alert",
      };
      client
      .subscribe(Alert, {
            next({data, errors}) {
                  expect(data.Alert.id).toBe(testData.Alert.id);
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
