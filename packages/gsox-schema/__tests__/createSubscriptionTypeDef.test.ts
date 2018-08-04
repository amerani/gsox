import { Field, Type } from "../src";
import { createSubscriptionType } from "../src/createSubscriptionTypeDef";

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

test("should output subscription type", () => {
      const res = createSubscriptionType([Ping, Message]);
      console.log(res);
});
