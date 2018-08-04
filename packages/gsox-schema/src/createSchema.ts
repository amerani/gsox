import "reflect-metadata";
import gql from "graphql-tag";
import { createSubscriptionType } from "./createSubscriptionTypeDef";
import { createTypeDefs } from "./createTypeDef";

const rootSchema = `
      type Query {
            hello: String
      }
      type schema {
            subscription: Subscription
            query: Query
      }
`
function createTypeDefString(types) {
      return `
            ${createSubscriptionType(types)} \n
            ${createTypeDefs(types)}
      `;
}

function createSchemaString(types) {
      return `
            ${rootSchema} \n
            ${createTypeDefString(types)}
      `
}

function createSchema(types) {
      return gql(createSchemaString(types));
}

export {
      createSchemaString,
      createSchema
}