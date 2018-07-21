//@ts-check
const { ApolloServer } = require('apollo-server-express');
import { createServer as http } from 'http';
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');
const bodyParser = require('body-parser');
const { schema } = require('./schemaBuilder');
import { pubSub } from './pubSubProvider';

export function createServer(app, serverOptions, routes) {
      const server = new ApolloServer({schema});
      app.post(routes.webhook, bodyParser.json(), (req, res) => {
            pubSub.publish('#', { ["notification"]: req.body });
            return res.sendStatus(202);
      })

      const ws = http(app);
      server.applyMiddleware({ app });

      ws.listen(serverOptions, () => {
            console.log(`🚀 Server ready at http://localhost:${serverOptions.port}${server.graphqlPath}`)
            new SubscriptionServer({
                  execute,
                  subscribe,
                  schema
            }, {
                  server: ws,
                  path: routes.graphql,
            })
      })
}