import { IResolverObject, IResolvers } from "../node_modules/graphql-tools";
import { pubSub } from "./pubSubProvider";

const pingSubscribe: IResolverObject = {
      subscribe() {
            setInterval(() => pubSub.publish("test", {
                Ping: { id: 0 },
            }), 2000);
            return pubSub.asyncIterator("test");
      },
};

const pingResolver: IResolvers<any, any> = {
      Ping: pingSubscribe,
};

export default pingResolver;
