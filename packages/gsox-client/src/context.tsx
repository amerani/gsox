import * as React from "react";
import * as Observable from "zen-observable";

const StreamContext = React.createContext<{client:any}>({client:null});

export class StreamProvider extends React.Component<any> {
      render() {
            const { client, children } = this.props;
            return <StreamContext.Provider
                        value={{client}}
                        children={children}
                   />
      }
}

export class StreamConsumer extends React.Component<any> {
      render() {
            const { type } = this.props;
            return <StreamContext.Consumer>
                        {({ client }) => {
                              Observable.from(client.subscribe(type)).subscribe(console.log)
                              return null
                        }}
                  </StreamContext.Consumer>
      }
}