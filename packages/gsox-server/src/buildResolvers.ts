import { TYPE_SYMBOL } from "@gsox/core";
import { withFilter } from "graphql-subscriptions";
import "reflect-metadata";
import { IResolvers } from "../node_modules/graphql-tools";
import pingResolver from "./pingResolver";
import { pubSub } from "./pubSubProvider";

function buildResolvers(types): IResolvers<any, any> {
      let resolvers = types.map((type) => {
            const obj = new type();
            const typeName = Reflect.get(obj, TYPE_SYMBOL);
            const resolver: IResolvers<any, any> = {
                  [typeName]: {
                        subscribe: withFilter(
                              () => pubSub.asyncIterator(`TOPIC_${typeName}`),
                              (payload, variables) => true,
                        ),
                  },
            };
            return resolver;
      });
      resolvers = resolvers.reduce((acc, cur) => ({...acc, ...cur}), { ...pingResolver });
      return { Subscription: resolvers };
}

export { buildResolvers };
