// import { InMemoryCache } from "apollo-cache-inmemory";
// import { ApolloClient} from "apollo-client";
// import { WebSocketLink } from "apollo-link-ws";
// import { SubscriptionClient } from "subscriptions-transport-ws";
import * as React from "react";
import * as ReactDOM from "react-dom"
import { DataProvider } from "../packages/gsox-client";

// const initialData = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));

// const wsClient = new SubscriptionClient(`ws://localhost:${port}/graphql`, { reconnect: true }, ws);

// const client = new ApolloClient({
//     link: new WebSocketLink(wsClient),
//     cache: new InMemoryCache()
// })

ReactDOM.hydrate(<DataProvider />,
      document.getElementById('content'));