import { makeExecutableSchema } from "graphql-tools";
import { buildResolvers } from './buildResolvers';
import { createSchema } from '@gsox/schema';

function buildSchema(types) {
      const typeDefs = createSchema(types);
      const resolvers = buildResolvers();
      const schema = makeExecutableSchema({typeDefs, resolvers});
      return schema;
}

export {
      buildSchema
}