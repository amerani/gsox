declare class ClientOptions {
      public host: string;
      public port: number;
      public routes: {
            graphql: string
            webhook: string,
      };
      public ws: any;
}
