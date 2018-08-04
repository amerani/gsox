import gql from "graphql-tag";
import * as React from "react";
import { Subscription } from "react-apollo";
import { ApolloProvider } from 'react-apollo';
import { subscription } from '@gsox/schema';
// import { host, port, routes } from "@gsox/core";
import { createClient } from "./";

function getClient(props):any {
  if(props.client) return props.client;
  // return createClient({host, port, routes}).rawClient;
}

class SubscriptionProvider extends React.Component<any, any> {
  render() {
    const query = gql`${subscription(this.props.inject)}`;
    const children = () => this.props.children;
    return (
      <ApolloProvider
        client={getClient(this.props)}
        children={
          <Subscription
          subscription={query}
          children={children}
        />
        }
      />
    )
  }
}

export const DataProvider = SubscriptionProvider;