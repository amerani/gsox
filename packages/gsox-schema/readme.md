# gsox-schema
decorators, types, and builders for describing data

## examples
```js
import { Type, Field, TypeNode, FieldNode } from "@gsox/schema"

@Type()
class Alert {
      @Field('Int')
      id:number;
}

@Type()
class MessageType { ... }

const schema = new TypeNode('Mail', [
      new FieldNode('id', 'Int'),
      new FieldNode('message', 'String')
])

const schemaString = `
      type Event {
            id: Int
      }
`

const inject = [MessageType, Alert, schema, schemaString] //client + server
```