import { Field, Type } from "../src";
import { createSchema, createSchemaString } from "../src/createSchema";

@Type()
class Ping {
      @Field("Int")
      public id: number;
}

@Type()
class Message {
      @Field()
      public content: string;
}

@Type()
class NestedMessage {
      @Field("Int")
      public id: number;
      @Field("Message")
      public Message: Message;
}

test("should output schema", () => {
      const res = createSchemaString([Ping, Message]);
      expect(res).toMatchSnapshot();
});

test("should build schema", () => {
      const res = createSchema([Ping, Message]);
      expect(res).toMatchSnapshot();
});

test("should build schema for nested types", () => {
      const res = createSchemaString([Message, NestedMessage]);
      expect(res).toMatchSnapshot();
});
