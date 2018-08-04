import { Field, Type, createTypeDef } from "@gsox/schema";
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
      @Field("Int")
      public id: number;
      @Field()
      public type: string;
      @Field(null, "timestamp")
      public data: string;
}

const ping = createTypeDef(new Ping());
const not = createTypeDef(new Notification());

const typeDefs = gql`
      type Subscription {
            Notification: Notification
            Ping: Ping
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
      ["Notification"]: {
            subscribe: withFilter(
                  () => pubSub.asyncIterator(NOTIFICATION_TOPIC),
                  (payload) => {
                        if (!payload) { return false; }
                        const notification = payload.Notification;
                        return notification.id === id;
                  },
            ),
      },
      Ping: {
            subscribe: () => {
                  setInterval(() => pubSub.publish("test", {
                      Ping: { id: 0 },
                  }), 2000);
                  return pubSub.asyncIterator("test");
            },
      },
  },
};

export const schema = makeExecutableSchema({typeDefs, resolvers});
