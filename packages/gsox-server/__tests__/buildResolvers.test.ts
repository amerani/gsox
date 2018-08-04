import { Ping } from "@gsox/schema";
import { buildResolvers } from "../src/buildResolvers";

test("should build resolvers", () => {
      expect(buildResolvers([Ping])).toMatchSnapshot();
});
