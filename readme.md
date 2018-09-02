# gsox
framework for streaming data to browser and mobile clients using grapqhl subscriptions, websockets, and webhook

## Installation
install all packages to existing project  
`npx gsox`  

install packages individually
```
npm install @gsox/schema
npm install @gsox/client
npm install @gsox/server
```

## Schema
describe your data types
```js
import { Type, Field } from "@gsox/schema"

@Type()
class Notification {

      @Field('Int')
      id:number

      @Field()
      type:string
}

@Type()
class MessageType { ... }

const inject = [Notification, MessageType]
```
[README](packages/gsox-schema/readme.md)

## Client
consume/subscribe to one or more types

### React
```js
import { createClient, StreamProvider, StreamConsumer } from "@gsox/client"

const client = createClient({ host, port })

<StreamProvider client={client}>
      <StreamConsumer types={[Notification]}>

      {({ data, error, loading }) => {
            if(loading) return <Loading />
            if(data) return <DataView />
      }}

      </StreamConsumer>
</StreamProvider>
```

### Observable
```js
import { createClient } from "@gsox/client"

const client = createClient({ host, port })

client.subscribe([Notification, MessageType], {
      next: data => console.log(data),
      error: error => console.log(error)
})
```
[README](packages/gsox-client/readme.md)

## Server
inject data types and apply express middleware
```js
import { applyMiddleware } from "@gsox/server"

const app = express()

const server = applyMiddleware(app, { host, port, inject })

server.listen(() => console.log(`gsox listening 🧦🧦🧦`))
```
[README](packages/gsox-server/readme.md)

## WebSocket Endpoint
`ws://host:port/graphql` - publishes webhook body to client subscribers

## Webhook Endpoint
`http://host:port/webhook` - accepts shape of your schema

## options
```js
{
  host: "localhost",
  port: 3000,
  routes: {
    graphql: "/graphql",
    webhook: "/webhook"
  },
  inject: [...types]
}
```
