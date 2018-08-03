import "reflect-metadata";
import { Field, Type } from "../src/decorators";
import { subscription } from "../src/subscription";

@Type("message")
class Message {

      @Field()
      public id: number;

      @Field("Int")
      public value: number;

      @Field("String")
      public message: any;

      public meta: any;
}

let message: Message;
beforeAll(() => message = new Message());

test("should output subscription", () => {
      const sub = subscription(message);
      console.log(sub);
});
