import {buildSchema} from "../src/schemaBuilder";

test("should build schema", () => {
      expect(buildSchema).toMatchSnapshot();
});
