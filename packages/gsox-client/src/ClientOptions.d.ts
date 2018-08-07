declare class ClientOptions {
      public host: string;
      public port: number;
      public routes: {
            graphql: string
            webhook: string,
      };
      public inject
            : {new ()}[]      //constructor functions
            | {}[]            //objects
            | string[];       //typedef strings
      public ws: any;
}
