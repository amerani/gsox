import { createSchema } from "@gsox/schema";
import { makeExecutableSchema } from "graphql-tools";
import { buildResolvers } from "./buildResolvers";

function buildSchema(types) {
      const typeDefs = createSchema(types);
      const resolvers = buildResolvers(types);
      const schema = makeExecutableSchema({typeDefs, resolvers});
      return schema;
}

export {
      buildSchema,
};
