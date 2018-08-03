import "reflect-metadata";
import { gql } from "apollo-server-express";
import * as express from "express";
import * as http from "http";
import { createServer } from "../packages/gsox-server";
import { createClient } from "../packages/gsox-client";
import { Ping } from './Ping';
import { Notification } from './Notification';
import { subscription } from "../packages/gsox-schema";

const host = "localhost";
const port = 5000;
const routes = {
      graphql: "/graphql",
      webhook: "/webhook"
}
let server;
let client;
beforeAll(() => {
      const app = express();
      server = createServer(app, { host, port, routes });
      client = createClient({ host, port, routes });
});

afterAll(() => {
      server.close();
});

test("should connect", () => {
      expect(server).not.toBeNull();
});

test("should ping", (done) => {
      client
      .subscribe({
            query: gql`${subscription(new Ping())}`,
      })
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
                  id: 99
            },
      };
      client
      .subscribe({
            query: gql`${subscription(new Notification())}`,
      })
      .subscribe({
            next({data}) {
                  expect(data.Notification.id).toBe(testData.Notification.id);
                  done();
            },
            error(e) { expect(e).toBeNull(); done(); },
      });

      setTimeout(() => {
            const req = http.request({
                  hostname: host, port,
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  path: routes.webhook,
            });
            req.write(Buffer.from(JSON.stringify(testData)));
            req.end();
      }, 1000);
}, 20000);
