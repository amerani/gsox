import { createServer } from "../src/createServer";
import * as express from "express";
import { Type, Field } from "@gsox/schema";

@Type()
class Test {
      @Field('String')
      success: boolean
}

test('should create server', () => {
      expect(createServer(express(), { host: "localhsot", port: 5000, inject: [Test] })).toMatchSnapshot();
})

test('should throw when not injected', () => {
      expect(() => createServer(express(), {})).toThrow();
})