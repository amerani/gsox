import { compile } from "../src/compile";
import { Field, Type } from "../src/decorators";

@Type()
class Ping {

      @Field()
      public id: string;
}

let ping: Ping;
beforeAll(() => ping = new Ping());

test("should compile", () => {
      const output = compile(ping);
      expect(output).not.toBeNull();
});
