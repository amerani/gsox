# gsox-server
express webosocket and webhook middleware

## Installation
```sh
npm i @gsox/server
```

## Usage
```js
import { applyMiddleware } from "@gsox/server"

// schema types
const inject = [Alert, Message]

const app = express();

// other endpoints
app.use('/', controller);

// apply gsox middleware
server = applyMiddleware(app, { host, port, inject })

server.listen(() => console.log('listening...'))
```

## Options
endpoint route config and shared schema

```js
import types from "./schema"
{
  host: "localhost",
  port: 3000,
  routes: {
    graphql: "/graphql",
    webhook: "/webhook"
  },
  inject: [...Object.values(types)]
}
```

## Schema Injection
inject class, instance, or string graphql type definition
```js
const inject: {new ()}[]      //constructor functions
            | {}[]            //objects
            | string[] =
      [
            Notification,     // class with
            Message,          // schema
            new Alert(),      // decorators

            //or typedef
            `message {
                  type: String
            }`
      ]
```

## Endpoints

### Webhook
`http://localhost:3000/webhook`

publishes request body to client subscribers

POST
```
{
  "Alert": {
    id: 99,
    type: "CRITICAL",
    data: "CODE: 123"
  }
}
```

### Websocket
`ws://localhost:3000/graphql`

subscribe directly using graphql
```
subscription {
  Alert {
    id
    type
    data
  }
}
```