import { Type, Field } from "../packages/gsox-schema";

@Type()
class Notification {
      @Field('Int')
      id:number;
      @Field()
      type: string;
      @Field()
      timestamp: string;
}

export { Notification }