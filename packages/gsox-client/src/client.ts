import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
const GRAPHQL_ENDPOINT = "ws://localhost:3000/graphql";

const wsClient = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true,
});

const wsLink = new WebSocketLink(wsClient);

export const client = new ApolloClient({
  cache: new InMemoryCache({}),
  connectToDevTools: true,
  link: ApolloLink.from([wsLink]),
  ssrForceFetchDelay: 100,
});
