import * as React from "react";
import * as ReactDOM from "react-dom"
import { StreamProvider, StreamConsumer, createClient } from "@gsox/client";
import { Ping } from "@gsox/schema";
import { routes } from "./config";
import { Stream } from "./types";

const client = createClient({ routes });

ReactDOM.render(
      <StreamProvider client={client}>
            <StreamConsumer types={[Ping, Stream]} />
      </StreamProvider>
, document.getElementById('content'));