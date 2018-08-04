import * as React from "react";
import * as ReactDOM from "react-dom"
import { ChannelProvider } from "@gsox/client";
import { Ping } from "./types";

ReactDOM.render(
      <ChannelProvider inject={Ping}>
            {({loading, data, error}) => {
                  if(loading) console.log("loading")
                  if(error) console.log("error", error)
                  if(data) console.log(data)
                  return null;
            }}
      </ChannelProvider>
, document.getElementById('content'));