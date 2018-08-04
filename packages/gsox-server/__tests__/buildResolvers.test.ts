import { buildResolvers } from "../src/buildResolvers";
import { Ping } from "@gsox/schema";

test('should build resolvers', () => {
      expect(buildResolvers([Ping])).toMatchSnapshot();
})