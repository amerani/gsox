import { gql } from "apollo-server-express";
import { withFilter } from "graphql-subscriptions";
import { makeExecutableSchema } from "graphql-tools";
import { pubSub } from "./pubSubProvider";

const typeDefs = gql`
  type Subscription {
      notification: Notification
      ping: Ping
  }
  type Ping {
      id: String
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
      ping: {
            subscribe: () => {
                  setTimeout(() => pubSub.publish("#", {
                      ping: { id: "0" },
                  }), 2000);
                  return pubSub.asyncIterator("#");
            },
      },
  },
};

export const schema = makeExecutableSchema({typeDefs, resolvers});
