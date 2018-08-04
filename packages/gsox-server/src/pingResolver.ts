import { pubSub } from "./pubSubProvider";
import { IResolvers, IResolverObject } from "../node_modules/graphql-tools";

const pingSubscribe: IResolverObject = {
      subscribe() {
            setInterval(() => pubSub.publish("test", {
                Ping: { id: 0 },
            }), 2000);
            return pubSub.asyncIterator("test");
      },
};

const pingResolver: IResolvers<any, any> = {
      Ping: pingSubscribe
}

export default pingResolver;