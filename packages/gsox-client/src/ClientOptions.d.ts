declare class ClientOptions {
      public host: string;
      public port: number;
      public routes: {
            graphql: string
            webhook: string,
      };
      public inject
            : Array<{new ()}>      // constructor functions
            | Array<{}>            // objects
            | string[];       // typedef strings
      public ws: any;
}
