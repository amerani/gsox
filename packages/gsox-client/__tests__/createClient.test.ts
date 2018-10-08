import { createClient } from "../src/createClient";

test("should create client", () => {
      const output = Object.keys(createClient({}));
      expect(output).toMatchSnapshot();
});

test("should create client with options", () => {
      const options: any = { host: "localhost", port: 3000, routes: { graphql: "/gql" }, inject: { } };
      const output = Object.keys(createClient(options));
      expect(output).toMatchSnapshot();
});
