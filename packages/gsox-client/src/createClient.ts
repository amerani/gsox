import { defaults } from "@gsox/core";
import { TYPE_SYMBOL } from "@gsox/core";
import { createSubscription } from "@gsox/schema";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { DocumentNode } from "graphql";
import gql from "graphql-tag";
import "reflect-metadata";
import "reflect-metadata";
import { SubscriptionClient } from "subscriptions-transport-ws";
import * as Observable from "zen-observable";
import { build } from "./buildSubscriptionQuery";
import * as typeGraph from "./typeGraph";

function createClient(options: ClientOptions) {
      const curOptions = {...defaults, ...options};
      const { ws, host, port, routes, inject } = curOptions;
      const GRAPHQL_ENDPOINT = `ws://${host}:${port}${routes.graphql}`;
      const wsClient = new SubscriptionClient(GRAPHQL_ENDPOINT, { reconnect: true }, ws);

      const wsLink = new WebSocketLink(wsClient);

      const client = new ApolloClient({
        cache: new InMemoryCache(),
        connectToDevTools: true,
        link: ApolloLink.from([wsLink]),
        ssrForceFetchDelay: 100,
      });

      const container = typeGraph.build(inject);

      const subscribe = (T, observer?: ZenObservable.Observer<{}>) => {
            // const query = gql(createSubscription(T));
            const obj = new T();
            const schemaType = Reflect.get(obj, TYPE_SYMBOL);
            const query: DocumentNode = build(schemaType, container[schemaType]);
            const apolloSub: any = client.subscribe({ query });
            const observable = Observable.from(apolloSub);
            if (observer) {
                  return observable.subscribe(observer);
            }
            return observable;
      };

      const subscribeWithQuery = (query, observer?) => {
            const apolloSub: any = client.subscribe({ query });
            const observable = Observable.from(apolloSub);
            if (observer) {
                  return observable.subscribe(observer);
            }
            return observable;
      }

      return {
            rawClient: client,
            subscribe,
            subscribeWithQuery
      };
}

export {
      createClient,
};
