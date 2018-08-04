import { createSubscription } from "@gsox/schema";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import gql from "graphql-tag";
import "reflect-metadata";
import { SubscriptionClient } from "subscriptions-transport-ws";
import * as defaults from "./defaults";

function createClient(options) {
      const curOptions = {...defaults, ...options};
      const { ws, host, port, routes } = curOptions;
      const GRAPHQL_ENDPOINT = `ws://${host}:${port}${routes.graphql}`;
      const wsClient = new SubscriptionClient(GRAPHQL_ENDPOINT, { reconnect: true }, ws);

      const wsLink = new WebSocketLink(wsClient);

      const client = new ApolloClient({
        cache: new InMemoryCache(),
        connectToDevTools: true,
        link: ApolloLink.from([wsLink]),
        ssrForceFetchDelay: 100,
      });

      return {
            rawClient: client,
            subscribe: (T) => client.subscribe({
                  query: gql(createSubscription(T)),
            }),
      };
}

export {
      createClient,
};
