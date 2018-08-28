import * as React from "react";
import * as ReactDOM from "react-dom"
import { StreamProvider, StreamConsumer, createClient } from "@gsox/client";
import { routes, inject, host, port } from "./config";
import { Ping } from "@gsox/schema";
import {
      Notification, Alert, Stream, Complex
} from "./types";

const client = createClient({ routes, host, port, ws:null, inject: [Ping, ...inject] });

class PingView extends React.Component {
      counter = 0;
      renderer = ({data, error, loading}) => {
            if(loading) return "Loading";
            if(data) {
                  this.counter++;
                  return (<h4>Ping # {this.counter}</h4>)
            }
      }
      render() {
            return <StreamConsumer
                  types={[Ping]}
                  children={this.renderer}
            />
      }
}

class StreamView extends React.Component {
      renderer = ({data, error, loading}) => data && (
            <p>Payload: {JSON.stringify(data)}</p>
      )
      render() {
            return <StreamConsumer
                  types={[Complex]}
                  children={this.renderer}
                  />
      }
}

ReactDOM.render(
      <StreamProvider client={client}>
            <PingView />
            <StreamView />
      </StreamProvider>
, document.getElementById('content'));

