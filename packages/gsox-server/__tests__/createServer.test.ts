import { Field, Type } from "@gsox/schema";
import * as express from "express";
import { applyMiddleware } from "../src/applyMiddleware";

@Type()
class Test {
      @Field("String")
      public success: boolean;
}

test("should create server", () => {
      const server = applyMiddleware(express(), { host: "localhost", port: 5000, inject: [Test] });
      expect(Object.keys(server)).toMatchSnapshot();
});

test("should throw when not injected", () => {
      expect(() => applyMiddleware(express(), {})).toThrow();
});
