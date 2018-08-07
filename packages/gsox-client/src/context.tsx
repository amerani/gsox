import * as React from "react";

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
      private client = null;
      private subscription:ZenObservable.Subscription = null;
      state = {
            data: null,
            error: null,
            loading: true
      }

      componentWillUnmount() {
            this.subscription.unsubscribe();
            delete this.subscription;
      }

      init = (types) => this.subscription = this.subscription ||
            types.map(type =>
                  this.client.subscribe(type)
                  .subscribe({
                        next: ({data}) => this.setState({data, loading: false}),
                        error: (error) => this.setState({error, loading: false})
                  })
      )
      render() {
            const { children, types } = this.props as {children: (s)=>React.ReactNode, types:any};
            return <StreamContext.Consumer children={({client}):any => {
                  this.client = client;
                  this.init(types);
                  return children(this.state);
            }} />
      }
}