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
test("should output schema", () => {
      const res = createSchemaString([Ping, Message]);
      console.log(res.trim());
});

test("should build schema", () => {
      const res = createSchema([Ping, Message]);
      expect(res).not.toBeNull();
});
