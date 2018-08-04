import * as React from "react";
import * as ReactDOM from "react-dom"
import { DataProvider, createClient } from "@gsox/client";
import { Ping } from "./types";
import { routes } from "./config";

const client = createClient({ routes }).rawClient;

ReactDOM.render(
      <DataProvider inject={Ping} client={client}>
            {({loading, data, error}) => {
                  if(loading) console.log("loading")
                  if(error) console.log("error", error)
                  if(data) console.log(data)
                  return null;
            }}
      </DataProvider>
, document.getElementById('content'));