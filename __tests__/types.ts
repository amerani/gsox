import { Type, Field, ListField } from '@gsox/schema';

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

@Type()
class Notification {
      @Field('Int')
      id:number;
      @Field()
      type: string;
      @Field()
      timestamp: string;
      @ListField(Notification)
      siblings:Notification[]
      @ListField(Alert)
      alerts: Alert[]
}

@Type()
class Stream {
      @Field('Int')
      id:number;
      @Field()
      type:string;
      @Field()
      data:string;
}

@Type()
class Complex {
      @Field('Int')
      id
      @Field(Notification)
      alert
}

export {
      Notification, Alert, Stream, Complex
}