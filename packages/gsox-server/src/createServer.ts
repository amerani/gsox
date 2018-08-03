import { ApolloServer } from "apollo-server-express";
import * as bodyParser from "body-parser";
import { execute, subscribe } from "graphql";
import { createServer as http } from "http";
import "reflect-metadata";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { NOTIFICATION_TOPIC } from "./constants";
import { pubSub } from "./pubSubProvider";
import { schema } from "./schemaBuilder";

export function createServer(app, options) {
      const { host, port, routes } = options;

      //add webhook endpoint
      app.post(routes.webhook, bodyParser.json(), (req, res) => {
            pubSub.publish(NOTIFICATION_TOPIC, req.body);
            return res.sendStatus(200);
      });

      //init apollo server
      const server = new ApolloServer({schema});
      server.applyMiddleware({ app });

      //setup websockets endpoint
      const ws = http(app);

      ws.listen({ host, port }, () => {
            // tslint:disable-next-line:no-console
            console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);

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
