import { Type, Field } from "../packages/gsox-schema";

@Type()
class Ping {
      @Field('Int')
      id:number;
}

export { Ping }