import { defaults } from "@gsox/core";
import { ApolloServer } from "apollo-server-express";
import * as bodyParser from "body-parser";
import { execute, subscribe } from "graphql";
import { createServer as http } from "http";
import "reflect-metadata";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { NOTIFICATION_TOPIC } from "./constants";
import { pubSub } from "./pubSubProvider";
import { buildSchema } from "./schemaBuilder";

export function createServer(app, options) {
      const curOpt = {...defaults, ...options};
      const { host, port, routes, inject } = curOpt;

      // build schema from types
      const schema = buildSchema(inject);

      // add webhook endpoint
      app.post(routes.webhook, bodyParser.json(), (req, res) => {
            pubSub.publish(NOTIFICATION_TOPIC, req.body);
            return res.sendStatus(200);
      });

      // init apollo server
      const path = routes.graphql;
      const apollo = new ApolloServer({ schema });
      apollo.applyMiddleware({ app, path });

      // init subscription websocket
      const server = http(app);
      SubscriptionServer.create({
            execute, schema, subscribe,
      }, {  path, server });

      return {
            apollo,
            server,
            host,
            port,
            routes,
            listen: (listener) => server.listen({ host, port }, listener),
            close: () => server.close(),
      };
}
