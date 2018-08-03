import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient} from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { gql } from "apollo-server-express";
import * as express from "express";
import * as http from "http";
import "reflect-metadata";
import { SubscriptionClient } from "subscriptions-transport-ws";
import * as ws from "ws";
import { createServer } from "../packages/gsox-server";

const hostname = "localhost";
const port = 5000;
let server;
let client: ApolloClient<{}>;
beforeAll(() => {
      const app = express();
      server = createServer(app, {
            host: "localhost",
            port,
      }, {
            graphql: "/graphql",
            webhook: "/webhook",
      });
      const wsClient = new SubscriptionClient(`ws://localhost:${port}/graphql`, { reconnect: true }, ws);
      client = new ApolloClient({
            cache: new InMemoryCache({}),
            link: new WebSocketLink(wsClient),
      });
});

afterAll(() => {
      server.close();
});

test("should connect", () => {
      expect(server).not.toBeNull();
});

test("should ping", (done) => {
      client.subscribe({
            query: gql`
                  subscription {
                        Ping {
                              id
                        }
                  }`,
      }).subscribe({
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
                  timestamp: "2019",
                  id: 99,
            },
      };
      client.subscribe({
            query: gql`
            subscription {
                  Notification {
                    type
                    id

                  }
                }`,
      }).subscribe({
            next({data}) {
                  expect(data.Notification.id).toBe(testData.Notification.id);
                  done();
            },
            error(e) { expect(e).toBeNull(); done(); },
      });

      setTimeout(() => {
            const req = http.request({
                  hostname, port,
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  path: "/webhook",
            });
            req.write(Buffer.from(JSON.stringify(testData)));
            req.end();
      }, 2000);
}, 20000);
