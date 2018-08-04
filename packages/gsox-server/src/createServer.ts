import { ApolloServer } from "apollo-server-express";
import * as bodyParser from "body-parser";
import { execute, subscribe } from "graphql";
import { createServer as http } from "http";
import "reflect-metadata";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { NOTIFICATION_TOPIC } from "./constants";
import { pubSub } from "./pubSubProvider";
import { buildSchema } from "./schemaBuilder";
import { defaults } from "@gsox/core";

export function createServer(app, options) {
      const curOpt = {...defaults, ...options}
      const { host, port, routes, inject } = curOpt;
      const schema = buildSchema(inject);

      // add webhook endpoint
      app.post(routes.webhook, bodyParser.json(), (req, res) => {
            pubSub.publish(NOTIFICATION_TOPIC, req.body);
            return res.sendStatus(200);
      });

      // init apollo server
      const server = new ApolloServer({schema});
      server.applyMiddleware({ app });

      // setup websockets endpoint
      const ws = http(app);

      ws.listen({ host, port }, () => {
            // tslint:disable-next-line:no-console
            console.log(`🚀 Server ready at http://${host}:${port}${server.graphqlPath}`);

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
