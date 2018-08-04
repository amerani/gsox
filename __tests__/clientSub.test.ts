import * as express from "express";
import * as http from "http";
import "reflect-metadata";
import { createClient } from "../packages/gsox-client";
import { createServer } from "../packages/gsox-server";
import { Alert } from "./Alert";

const port = 5001;
const inject = [Alert];
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

test("should subscribe", (done) => {
      const testData = {
            Alert: {
                  type: "test",
                  id: 99,
            },
            typeName: "Alert",
      };
      client
      .subscribe(Alert)
      .subscribe({
            next({data}) {
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
