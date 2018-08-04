import * as React from "react";
import * as ReactDOM from "react-dom"
import { DataProvider, createClient } from "@gsox/client";
import { Ping } from "./types";

const host = "localhost";
const port = 5000;
const routes = {
      graphql: "/graphql",
      webhook: "/webhook"
}
const inject = [Ping, Notification];

const client = createClient({ host, port, routes, inject }).rawClient;

ReactDOM.render(
      <DataProvider inject={new Ping()} client={client}>
            {({loading, data, error}) => {
                  if(loading) console.log("loading")
                  if(error) console.log("error", error)
                  if(data) console.log(data)
                  return null;
            }}
      </DataProvider>
, document.getElementById('content'));