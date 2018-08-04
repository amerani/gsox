import { Field, Type } from "../packages/gsox-schema";

@Type()
class Ping {
      @Field("Int")
      public id: number;
}

export { Ping };
