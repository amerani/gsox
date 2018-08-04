import "reflect-metadata";
import { Field, Type } from "../src";
import { createTypeDef, createTypeDefs } from "../src/createTypeDef";

@Type("message")
class Message {

      @Field()
      public id: number;

      @Field("Int")
      public value: number;

      @Field("String")
      public message: any;

      public meta: any;
}

@Type()
class Test {
      @Field('Int')
      id: any
}

let message: Message;
beforeAll(() => message = new Message());

test("should create one typedef", () => {
      const sub = createTypeDef(Message);
      expect(sub).toMatchSnapshot();
});


test("should create many typedefs", () => {
      const sub = createTypeDefs([Message, Test]);
      expect(sub).toMatchSnapshot();
});
