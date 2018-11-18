import * as express from "express";
import * as http from "http";
import "reflect-metadata";
import { createClient } from "@gsox/client";
import { applyMiddleware } from "@gsox/server";
import { Alert } from "./Alert";
import * as getPort from "get-port";

const inject = [Alert];
let server;
let client;
let port;
beforeAll(async (done) => {
      port = await getPort();
      const app = express();
      server = applyMiddleware(app, { port, inject });
      const { host, routes } = server;
      client = createClient({ port, host, routes, ws: null, inject });
      server.listen(() => console.log("server listening..."));
      done();
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
