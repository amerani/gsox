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
            const { type, types } = this.props;
            return <StreamContext.Consumer>
                        {({ client }) => {
                              const stream = types
                                    .map(type => Observable.from(client.subscribe(type)))
                                    .reduce((acc, cur) => acc.concat(cur));
                              stream.subscribe(console.log);
                              // Observable.from(client.subscribe(type)).subscribe(console.log)
                              return null
                        }}
                  </StreamContext.Consumer>
      }
}