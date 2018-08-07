# gsox-client
subscription client for consuming webhook data

## installation
```sh
#npm
npm install @gsox/client

#yarn
yarn add @gsox/client
```

## react
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

## observable
```js
import { createClient } from "@gsox/client"

const client = createClient({ host, port })

client.subscribe([...types], {
      next: data => console.log(data),
      error: error => console.log(error)
})
```

## options
```js
{
  host: "localhost",
  port: 3000,
  routes: {
    graphql: "/graphql"
  }
}
```