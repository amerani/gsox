import { Field, Type, typeDef } from "@gsox/schema";
import { gql } from "apollo-server-express";
import { withFilter } from "graphql-subscriptions";
import { makeExecutableSchema } from "graphql-tools";
import "reflect-metadata";
import { NOTIFICATION_TOPIC } from "./constants";
import { pubSub } from "./pubSubProvider";

@Type()
class Ping {

      @Field()
      public id: string;
}

@Type()
class Notification {
      @Field(null, "Int")
      public id: number;
      @Field()
      public type: string;
      @Field("timestamp")
      public data: string;
}

const ping = typeDef(new Ping());
const not = typeDef(new Notification());

const typeDefs = gql`
      type Subscription {
            notification: Notification
            ping: Ping
      }

      ${ping}

      ${not}

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
