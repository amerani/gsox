import { createClient } from "../";

test('should create client', () => {
      expect(createClient({ })).toMatchSnapshot();
})

test('should create client with options', () => {
      const options = { host: "localhost", port: 3000, routes: { graphql: "/gql" }, inject: { } };
      expect(createClient(options)).toMatchSnapshot();
})