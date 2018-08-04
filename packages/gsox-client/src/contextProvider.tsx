import gql from "graphql-tag";
import * as React from "react";
import { Subscription, SubscriptionResult } from "react-apollo";
import { ApolloProvider } from 'react-apollo';
import { createSubscription } from '@gsox/schema';
import { host, port, routes } from "@gsox/core";
import { createClient } from "./";

function getClient(props):any {
  if(props.client) return props.client;
  return createClient({host, port, routes}).rawClient;
}

class SubscriptionProvider extends React.Component<any, any> {
  render() {
    const query = gql`${createSubscription(this.props.inject)}`;
    return (
      <ApolloProvider
        client={getClient(this.props)}
        children={
          <Subscription
          subscription={query}>
            {this.props.children as (result: SubscriptionResult) => React.ReactNode}
          </Subscription>
        }
      />
    )
  }
}

export const DataProvider = SubscriptionProvider;