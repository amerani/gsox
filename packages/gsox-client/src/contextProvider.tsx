import gql from "graphql-tag";
import * as React from "react";
import { Subscription, SubscriptionResult } from "react-apollo";
import { ApolloProvider } from 'react-apollo';
import { client } from './client';
import { Type, Field, typeDef, subscription } from '@gsox/schema';

@Type("ping")
class Ping {
      @Field(null, "Int")
      public id: number;
}

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
        client={client(this.props.ws)}
        children={
          <Subscription
          subscription={gql`${subscription(new Ping())}`}
          children={children}
        />
        }
      />
    )
  }
}

export const DataProvider = SubscriptionProvider;