import "reflect-metadata";
import { withFilter } from "graphql-subscriptions";
import { NOTIFICATION_TOPIC } from "./constants";
import { pubSub } from "./pubSubProvider";

function buildResolvers() {
      return {
            Subscription: {
                ["Notification"]: {
                      subscribe: withFilter(
                            () => pubSub.asyncIterator(NOTIFICATION_TOPIC),
                            (payload) => {
                                  if (!payload) { return false; }
                                  const notification = payload.Notification;
                                  // return notification.id === id;
                                  return true;
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
}

export { buildResolvers }