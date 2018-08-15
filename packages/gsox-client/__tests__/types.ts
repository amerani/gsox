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
class Stream {
      @Field('Int')
      id:number;
      @Field()
      type:string;
      @Field()
      data:string;
}

@Type()
class AlertType {
      @Field()
      type:string;
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
      @Field(AlertType)
      type:AlertType
}

@Type()
class Complex {
      @Field('Int')
      id
      @Field(Alert)
      alert
}

export {
      Notification, Alert, Stream, Complex
}
