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

@Type()
class Alert {
      @Field('Int')
      id:number;
      @Field()
      message: string;
      @Field()
      severity: string;
      @Field()
      timestamp: string;
}

export {
      Ping, Notification, Alert
}

