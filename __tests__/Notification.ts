import { Field, Type } from "../packages/gsox-schema";

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
