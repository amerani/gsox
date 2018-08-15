import { createClient } from "../src/createClient";

test("should create client", () => {
      expect(createClient({ } as any)).toMatchSnapshot();
});

test("should create client with options", () => {
      const options:any = { host: "localhost", port: 3000, routes: { graphql: "/gql" }, inject: { } };
      expect(createClient(options)).toMatchSnapshot();
});
