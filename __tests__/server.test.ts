import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient} from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { gql } from "apollo-server-express";
import * as express from "express";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { createServer } from "../packages/gsox-server";

let server;
let client: ApolloClient<{}>;
beforeAll(() => {
      const app = express();
      server = createServer(app, {
            host: "localhost",
            port: "4000",
      }, {
            graphql: "/graphql",
            webhook: "/webhook",
      });
      const wsClient = new SubscriptionClient("ws://localhost:4000/graphql", { reconnect: true });
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
                        ping {
                              id
                        }
                  }`,
      }).subscribe({
            next({data: {ping}}) {
                  expect(ping.id).toBe("0");
                  done();
            },
      });
});
