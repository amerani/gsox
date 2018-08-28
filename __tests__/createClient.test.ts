import * as express from "express";
import * as http from "http";
import "reflect-metadata";
import { createClient } from "../packages/gsox-client";
import { Field, Type } from "../packages/gsox-schema";
import { applyMiddleware } from "../packages/gsox-server";
import { Ping } from "../packages/gsox-schema";

const port = 5000;
@Type()
class MessageType {
      @Field()
      public type: string;
      constructor() { }
}
@Type()
class Message {
      @Field("Int")
      public id: number;
      @Field(MessageType)
      public type: MessageType;
}

const inject = [Message, MessageType];
let server;
let client;
beforeAll(() => {
      const app = express();
      server = applyMiddleware(app, { port, inject });
      const { host, routes } = server;
      client = createClient({ port, host, routes, ws: null, inject: [Ping, ...inject] });
      server.listen(() => console.log("server listening..."));
});

afterAll(() => {
      server.close();
});

test("should subscribe", (done) => {
      const testData = {
            Message: {
                  id: 99,
                  MessageType: {
                        type: "Email",
                  },
            },
            typeName: "Message",
      };
      client
      .subscribe(Message, {
            next({data, errors}) {
                  expect(errors == null || errors == undefined).toBe(true);
                  expect(data.Message.id).toBe(testData.Message.id);
                  done();
            },
            error(e) { expect(e).toBeNull(); done(); },
      });

      setTimeout(() => {
            const req = http.request({
                  hostname: "localhost", port,
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  path: "/gsox/webhook",
            });
            req.write(Buffer.from(JSON.stringify(testData)));
            req.end();
      }, 1000);
}, 20000);
