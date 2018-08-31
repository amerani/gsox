import * as express from "express";
import * as http from "http";
import "reflect-metadata";
import { createClient } from "../packages/gsox-client";
import { Field, Type } from "../packages/gsox-schema";
import { applyMiddleware } from "../packages/gsox-server";
import { Ping } from "../packages/gsox-schema";
import * as types from "./types";
import gql from "graphql-tag";

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

const inject = [Message, MessageType, ...Object.values(types)];
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
        "Complex": {
            "alert": {
                "id":1,
                "siblings": [
                    {
                        "id": 11,
                        "alerts": [
                            { "message": "alert 11 fired"},
                            { "message": "alert 11 fired"}
                        ]
                    }
                ],
                "alerts": [
                            { "message": "alert 1 fired"},
                            { "message": "alert 1 fired"}
                        ]
            }
        },
        "typeName": "Complex"
      }
      const query = gql`
      subscription {
            Complex {
              alert {
                id
                siblings {
                  id
                  alerts {
                    message
                  }
                }
                alerts {
                  message
                }
              }
            }
          }      
      `
      client
      .subscribeWithQuery(query, {
            next({data, errors}) {
                  expect(errors == null || errors == undefined).toBe(true);
                  console.log("recieved data")
                  console.log(JSON.stringify(data))
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

