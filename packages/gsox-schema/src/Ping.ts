import { Field, Type } from "./";

@Type()
class Ping {
      @Field("Int")
      public id: number;
}

export { Ping };
