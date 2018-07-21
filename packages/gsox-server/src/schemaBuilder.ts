import { gql } from "apollo-server-express";
import { withFilter } from "graphql-subscriptions";
import { makeExecutableSchema } from "graphql-tools";
import { pubSub } from "./pubSubProvider";

const typeDefs = gql`
  type Subscription {
      notification: Notification
  }
  type Notification {
        type: String
        timestamp: String
  }
  type Query {
        hello: String
  }
  type schema {
        subscription: Subscription
        query: Query
  }
`;

const id = "99";

const resolvers = {
  Subscription: {
      ["notification"]: {
            subscribe: withFilter(
                  () => pubSub.asyncIterator("#"),
                  (payload) => {
                        const notification = payload.notification;
                        return id === notification.id;
                  },
            ),
        },
  },
};

export const schema = makeExecutableSchema({typeDefs, resolvers});
