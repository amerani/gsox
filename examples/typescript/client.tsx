import * as React from "react";
import * as ReactDOM from "react-dom"
import { StreamProvider, StreamConsumer, createClient } from "@gsox/client";
import { routes, inject } from "./config";
import { Ping } from "@gsox/schema";

const client = createClient({ routes });

const logger = ({data, error, loading}) => {
      if(loading) return <p>loading</p>
      if(data) return <p>{JSON.stringify(data)}</p>
      if(error) return <p>{JSON.stringify(error)}</p>
}

ReactDOM.render(
      <StreamProvider client={client}>
            <StreamConsumer types={[Ping]} children={logger} />
            <StreamConsumer types={inject} children={logger} />
      </StreamProvider>
, document.getElementById('content'));

