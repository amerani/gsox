import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient} from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { gql } from "apollo-server-express";
import { SubscriptionClient } from "subscriptions-transport-ws";
import * as ws from "ws";

const port = 3000;
const wsClient = new SubscriptionClient(`ws://localhost:${port}/graphql`, { reconnect: true }, ws);
const client = new ApolloClient({
      cache: new InMemoryCache({}),
      link: new WebSocketLink(wsClient),
});
client.subscribe({
      query: gql`
      subscription {
            msg {
                  type
                  id

            }
            }`,
}).subscribe(
      console.log,
      console.log,
      console.log,
);
