import "reflect-metadata";
import { Field, Type } from "../src";
import { createSubscription } from "../src/createSubscription";

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
      const sub = createSubscription(Message);
      console.log(sub);
});
