import { Field, Type, typeDef } from "../src";

@Type()
class Ping {

      @Field()
      public id: string;
}

let ping: Ping;
beforeAll(() => ping = new Ping());

test("should compile", () => {
      const output = typeDef(ping);
      expect(output).not.toBeNull();
});
