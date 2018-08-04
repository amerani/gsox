import { Field, Type } from "@gsox/schema";
import * as express from "express";
import { createServer } from "../src/createServer";

@Type()
class Test {
      @Field("String")
      public success: boolean;
}

test("should create server", () => {
      expect(createServer(express(), { host: "localhsot", port: 5000, inject: [Test] })).toMatchSnapshot();
});

test("should throw when not injected", () => {
      expect(() => createServer(express(), {})).toThrow();
});
