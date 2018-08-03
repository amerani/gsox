import gql from "graphql-tag";
import * as React from "react";
import { Subscription, SubscriptionResult } from "react-apollo";
import { ApolloProvider } from 'react-apollo';
import { client } from './client';
import { subscription } from '@gsox/schema';

const children = (result: SubscriptionResult<any> ): React.ReactNode => {
  const { data, loading, error } = result;
  if(loading) console.log("loading")
  if(error) console.log("error", error)
  if(data) console.log(data)
  return null;
}

class SubscriptionProvider extends React.Component<any, any> {
  render() {
    const query = gql`${subscription(this.props.inject)}`;
    return (
      <ApolloProvider
        client={client(this.props.ws)}
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