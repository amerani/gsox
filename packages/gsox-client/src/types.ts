import { Field, Type } from "@gsox/schema";

@Type()
class Notification {
      @Field("Int")
      public id: number;
      @Field()
      public type: string;
      @Field()
      public timestamp: string;
}

@Type()
class Stream {
      @Field("Int")
      public id: number;
      @Field()
      public type: string;
      @Field()
      public data: string;
}

@Type()
class AlertType {
      @Field()
      public type: string;
}

@Type()
class Alert {
      @Field("Int")
      public id: number;
      @Field()
      public message: string;
      @Field()
      public severity: string;
      @Field()
      public timestamp: string;
      @Field(AlertType)
      public type: AlertType;
}

@Type()
class Complex {
      @Field("Int")
      public id;
      @Field(Alert)
      public alert;
}

export {
      Notification, Alert, Stream, Complex,
};
