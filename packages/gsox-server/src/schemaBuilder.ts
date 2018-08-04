import { Field, Type } from "@gsox/schema";
import { makeExecutableSchema } from "graphql-tools";
import "reflect-metadata";
import { buildResolvers } from './buildResolvers';
import { createSchema } from '@gsox/schema';

@Type()
class Ping {
      @Field()
      public id: string;
}

@Type()
class Notification {
      @Field("Int")
      public id: number;
      @Field()
      public type: string;
      @Field(null, "timestamp")
      public data: string;
}


function buildSchema(types) {
      const typeDefs = createSchema([Ping, Notification])
      const resolvers = buildResolvers();
      const schema = makeExecutableSchema({typeDefs, resolvers});
      return schema;
}

export {
      buildSchema
}