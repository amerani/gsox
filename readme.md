# gsox
framework for streaming data to browser and mobile clients using grapqhl subscriptions, websockets, and webhook

## installation
`npx gsox`

## schema
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

## client
consume/subscribe to one or more types

### react
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

### observable
```js
import { createClient } from "@gsox/client"

const client = createClient({ host, port })

client.subscribe([Notification, MessageType], {
      next: data => console.log(data),
      error: error => console.log(error)
})
```

## server
inject data types and apply express middleware
```js
import { applyMiddleware } from "@gsox/server"

const app = express()

const server = applyMiddleware(app, { host, port, inject })

server.listen(() => console.log(`gsox listening 🧦🧦🧦`))
```

## endpoints
`http://host:port/webhook` - accepts shape of your schema

`ws://host:port/graphql` - publishes webhook body to client subscribers

## options
```js
{
  host: "localhost",
  port: 3000,
  routes: {
    graphql: "/graphql",
    webhook: "/webhook"
  }
}
```