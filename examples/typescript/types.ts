import { Type, Field } from '@gsox/schema';

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
      Notification, Alert
}

