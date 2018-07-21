import { ApolloServer } from "apollo-server-express";
import * as bodyParser from "body-parser";
import { execute, subscribe } from "graphql";
import { createServer as http } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { pubSub } from "./pubSubProvider";
import { schema } from "./schemaBuilder";

export function createServer(app, serverOptions, routes) {
      const server = new ApolloServer({schema});
      app.post(routes.webhook, bodyParser.json(), (req, res) => {
            pubSub.publish("#", { ["notification"]: req.body });
            return res.sendStatus(202);
      });

      const ws = http(app);
      server.applyMiddleware({ app });

      ws.listen(serverOptions, () => {
            // tslint:disable-next-line:no-console
            console.log(`🚀 Server ready at http://localhost:${serverOptions.port}${server.graphqlPath}`);
            SubscriptionServer.create({
                  execute,
                  schema,
                  subscribe,
            }, {
                  path: routes.graphql,
                  server: ws,
            });
      });
}
