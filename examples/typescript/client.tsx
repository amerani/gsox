import * as React from "react";
import * as ReactDOM from "react-dom"
import { StreamProvider, StreamConsumer, createClient } from "@gsox/client";
import { routes, inject } from "./config";
import { Ping } from "@gsox/schema";

const client = createClient({ routes });

ReactDOM.render(
      <StreamProvider client={client}>
            <StreamConsumer types={[Ping, ...inject]}>
            {(data) => console.log(JSON.stringify(data))}
            </StreamConsumer>
      </StreamProvider>
, document.getElementById('content'));