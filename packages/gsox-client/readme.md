# gsox-client
subscription client for consuming webhook data

## Installation
```sh
#npm
npm install @gsox/client

#yarn
yarn add @gsox/client
```

## React
```js
import { createClient, StreamProvider, StreamConsumer } from "@gsox/client"

const client = createClient({ host, port, inject })

<StreamProvider client={client}>
      <StreamConsumer types={[Notification]}>

      {({ data, error, loading }) => {
            if(loading) return <Loading />
            if(data) return <DataView />
      }}

      </StreamConsumer>
</StreamProvider>
```

## Observable
```js
import { createClient } from "@gsox/client"

const client = createClient({ host, port, inject })

client.subscribe([Notification, Alert], {
      next: data => console.log(data),
      error: error => console.log(error)
})
```

## Subscribe with GraphQL DocumentNode
```js
import gql from "graphql-tag";

const query = gql`
  subscription {
    Alert {
      id
      timestamp
    }
  }
`
client.subscribeWithQuery(query, {
      next: data => console.log(data),
      error: error => console.log(error)
});
```

## Options
```js
{
  host: "localhost",
  port: 3000,
  routes: {
    graphql: "/graphql"
  },
  inject: [...types]
}
```