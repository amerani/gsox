import * as React from "react";
import * as ReactDOM from "react-dom"
import { StreamProvider, StreamConsumer, createClient } from "@gsox/client";
import { Ping } from "@gsox/schema";
import { routes } from "./config";

const client = createClient({ routes });

ReactDOM.render(
      <StreamProvider client={client}>
            <StreamConsumer type={Ping} />
      </StreamProvider>
, document.getElementById('content'));