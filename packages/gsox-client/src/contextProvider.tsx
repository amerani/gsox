import gql from "graphql-tag";
import * as React from "react";
import { Subscription, SubscriptionResult } from "react-apollo";
import { ApolloProvider } from 'react-apollo';
import { client } from './client';

const PING_SUSBSCRIPTION = gql`
  subscription {
    ping {
      id
    }
  }
`;

const children = (result: SubscriptionResult<any> ): React.ReactNode => {
  const { data, loading, error } = result;
  if(loading) console.log("loading")
  if(error) console.log("error", error)
  if(data) console.log(data)
  return null;
}

class SubscriptionProvider extends React.Component<any, any> {
  render() {
    return (
      <ApolloProvider
        client={client}
        children={
          <Subscription
          subscription={PING_SUSBSCRIPTION}
          children={children}
        />
        }
      />
    )
  }
}

export const DataProvider = SubscriptionProvider;