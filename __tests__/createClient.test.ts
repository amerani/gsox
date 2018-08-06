import * as express from "express";
import * as http from "http";
import "reflect-metadata";
import { createClient } from "../packages/gsox-client";
import { Field, Type } from "../packages/gsox-schema";
import { createServer } from "../packages/gsox-server";

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

const port = 5001;
const inject = [Message, MessageType];
let server;
let client;
beforeAll(() => {
      const app = express();
      server = createServer(app, { port, inject });
      const { host, routes } = server;
      client = createClient({ port, host, routes, ws: null });
      server.listen(() => console.log("server listening..."));
});

afterAll(() => {
      // server.close();
});

test.skip("should subscribe", (done) => {
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
      .subscribe(Message)
      .subscribe({
            next({data, errors}) {
                  expect(errors).toBeNull();
                  expect(errors).toHaveLength(0);
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
