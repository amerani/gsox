import { Field, Type } from "../packages/gsox-schema";

@Type()
class Alert {
      @Field("Int")
      public id: number;
      @Field()
      public message: string;
      @Field()
      public timestamp: string;
}

export { Alert };
