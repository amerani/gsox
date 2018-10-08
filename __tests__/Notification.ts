import { Field, Type } from "@gsox/schema";

@Type()
class Notification {
      @Field("Int")
      public id: number;
      @Field()
      public type: string;
      @Field()
      public timestamp: string;
}

export { Notification };
