import * as React from "react";
import * as ReactDOM from "react-dom"
import { StreamProvider, StreamConsumer, createClient } from "@gsox/client";
import { routes, inject } from "./config";
import { Ping } from "@gsox/schema";

const client = createClient({ routes });

class Content extends React.Component<any> {
      state = {
            data: undefined,
            loading: true,
            error: undefined
      }
      render() {
            return(
                  <>
                  <p>{JSON.stringify(this.state)}</p>
                  <StreamConsumer types={this.props.inject}>
                  {{
                        next: data => this.setState({ data, loading: false }),
                        error: error => this.setState({ error, loading: false})
                  }}
                  </StreamConsumer>
                  </>
            )
      }
}

ReactDOM.render(
      <StreamProvider client={client}>
            <Content inject={inject} />
      </StreamProvider>
, document.getElementById('content'));

