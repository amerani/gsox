import { ApolloServer } from "apollo-server-express";
import * as bodyParser from "body-parser";
import { execute, subscribe } from "graphql";
import { createServer as http } from "http";
import "reflect-metadata";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { NOTIFICATION_TOPIC } from "./constants";
import { pubSub } from "./pubSubProvider";
import { schema } from "./schemaBuilder";

export function createServer(app, serverOptions, routes) {
      const server = new ApolloServer({schema});
      app.post(routes.webhook, bodyParser.json(), (req, res) => {
            pubSub.publish(NOTIFICATION_TOPIC, req.body);
            return res.sendStatus(200);
      });

      const ws = http(app);
      server.applyMiddleware({ app });

      ws.listen(serverOptions, () => {
            // tslint:disable-next-line:no-console
            console.log(`🚀 Server ready at http://localhost:${serverOptions.port}${server.graphqlPath}`);

      });
      SubscriptionServer.create({
            execute,
            schema,
            subscribe,
      }, {
            path: routes.graphql,
            server: ws,
      });
      return ws;
}
