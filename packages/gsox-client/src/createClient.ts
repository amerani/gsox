import "reflect-metadata";
import gql from "graphql-tag";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { typeSub } from "@gsox/schema";

function createClient(options) {
      const { ws, host, port, routes } = options;
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
                  query: gql(typeSub(T))
            })
      }
}

export {
      createClient
}