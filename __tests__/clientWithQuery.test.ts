import * as express from "express";
import * as http from "http";
import "reflect-metadata";
import { createClient } from "@gsox/client";
import { Field, Type, Ping } from "@gsox/schema";
import { applyMiddleware } from "@gsox/server";
import * as types from "./types";
import gql from "graphql-tag";
import * as getPort from "get-port";

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
let port;
beforeAll(async (done) => {
      port = await getPort();
      const app = express();
      server = applyMiddleware(app, { port, inject });
      const { host, routes } = server;
      client = createClient({ port, host, routes, ws: null, inject: [Ping, ...inject] });
      server.listen(() => console.log("server listening..."));
      done();
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
                  expect(data.Complex.alert.siblings[0].alerts[0]["__typename"]).toBe("Alert");
                  expect(data.Complex.alert.alerts[0]["__typename"]).toBe("Alert");
                  console.log("recieved data")
                  console.log(JSON.stringify(data, null, 2))
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

