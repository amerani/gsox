import { createSchema, createSchemaString } from '../src/createSchema';
import { Type, Field } from '../src';

@Type()
class Ping {
      @Field('Int')
      id:number;
}

@Type()
class Message {
      @Field()
      content: string;
}
test('should output schema', () => {
      const res = createSchemaString([Ping, Message]);
      console.log(res.trim());
})

test('should build schema', () => {
      const res = createSchema([Ping, Message]);
      expect(res).not.toBeNull();
})
