# gsox-schema
decorators, types, and builders for describing data

## installation
```sh
npm i @gsox/schema
```

## Decorators
```js
import { Type, Field } from "@gsox/schema"

@Type()
class Alert {
      @Field('Int')
      id:number;

      @Field()
      data: string;
}

@Type()
class MessageType { ... }
```

[TypeScript Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)  
[JavaScript Decorators](https://babeljs.io/docs/en/babel-plugin-syntax-decorators)

## AST Builders (wip)
```js
import { TypeNode, FieldNode } from "@gsox/schema"

const alertTypeNode = new TypeNode('Alert', [
      new FieldNode('id', 'Int'),
      new FieldNode('data', 'String')
])
```

## GraphQL (wip)
```js
const typeDef = `
      type Alert {
            id: Int
            data: String
      }
`
```

## Schema Injection
inject shared client and server types or graphql type definitions
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
```js
// client.js
import { createClient } from "@gsox/client"

const client = createClient(options)
client.subscribe([...inject], observer)
```
```js
// server.js
import { applyMiddleware } from "@gsox/server"

const app = express()
const server = applyMiddleware(app, [...inject])
```
