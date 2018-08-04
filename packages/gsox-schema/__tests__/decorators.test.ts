import { FIELD_SYMBOL, TYPE_SYMBOL } from "@gsox/core";
import "reflect-metadata";
import { Field, Type } from "../src/decorators";

@Type()
class Message {

      @Field()
      public id: number;

      @Field("String", "userId")
      public user: string;

      @Field("Int")
      public value: number;

      @Field("String", "msg")
      public message: any;

      public meta: any;
}

let message: Message;
beforeAll(() => message = new Message());

test("should get type", () => {
      const type = Reflect.get(message, TYPE_SYMBOL);
      expect(type).toBe("Message");
});

test("should not find metadata for meta", () => {
      const metadata = Reflect.getMetadata(FIELD_SYMBOL, message);
      const field = metadata.find((x) => x.id === "meta");
      expect(field).toBeUndefined();
});

test("should find metadata for id field", () => {
      const metadata = Reflect.getMetadata(FIELD_SYMBOL, message);
      const field = metadata.find((x) => x.id === "id");
      expect(field).not.toBeNull();
      expect(field.name).toBe("id");
      expect(field.type).toBe("Number");
});

test("should find metadata for user field", () => {
      const metadata = Reflect.getMetadata(FIELD_SYMBOL, message);
      const field = metadata.find((x) => x.id === "user");
      expect(field).not.toBeNull();
      expect(field.name).toBe("userId");
      expect(field.type).toBe("String");
});

test("should find metadata for value field", () => {
      const metadata = Reflect.getMetadata(FIELD_SYMBOL, message);
      const field = metadata.find((x) => x.id === "value");
      expect(field).not.toBeNull();
      expect(field.name).toBe("value");
      expect(field.type).toBe("Int");
});

test("should find metadata for message field", () => {
      const metadata = Reflect.getMetadata(FIELD_SYMBOL, message);
      const field = metadata.find((x) => x.id === "message");
      expect(field).not.toBeNull();
      expect(field.name).toBe("msg");
      expect(field.type).toBe("String");
});
