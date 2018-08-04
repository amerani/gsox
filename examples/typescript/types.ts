import { Type, Field } from '@gsox/schema';

@Type()
class Ping {
    @Field('Int')
    id
}

@Type()
class Notification {
      @Field('Int')
      id:number;
      @Field()
      type: string;
      @Field()
      timestamp: string;
}

export {
      Ping, Notification
}

