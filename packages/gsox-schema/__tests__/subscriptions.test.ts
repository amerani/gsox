import "reflect-metadata";
import { Field, Type } from "../src/decorators";
import { subscription } from "../src/subscription";

@Type("message")
class Message {

      @Field()
      public id: number;

      @Field("userId")
      public user: string;

      @Field(null, "Int")
      public value: number;

      @Field("msg", "String")
      public message: any;

      public meta: any;
}

let message: Message;
beforeAll(() => message = new Message());

test("should output subscription", () => {
      const sub = subscription(message);
      console.log(sub);
});
