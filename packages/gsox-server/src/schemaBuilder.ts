import { gql } from "apollo-server-express";
import { withFilter } from "graphql-subscriptions";
import { makeExecutableSchema } from "graphql-tools";
import { NOTIFICATION_TOPIC } from "./constants";
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
        id: Int
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

const id = 99;

const resolvers = {
  Subscription: {
      ["notification"]: {
            subscribe: withFilter(
                  () => pubSub.asyncIterator(NOTIFICATION_TOPIC),
                  (payload) => {
                        if (!payload) { return false; }
                        const notification = payload.notification;
                        return notification.id === id;
                  },
            ),
      },
      ping: {
            subscribe: () => {
                  setInterval(() => pubSub.publish("test", {
                      ping: { id: 0 },
                  }), 2000);
                  return pubSub.asyncIterator("test");
            },
      },
  },
};

export const schema = makeExecutableSchema({typeDefs, resolvers});
