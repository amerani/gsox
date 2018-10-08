import * as types from './types';

const routes = { graphql: "/graphql", webhook: "/gsox/webhook" };

const inject = [...Object.values(types)];

const host = "0.0.0.0";
const port = 8000;

export { routes, inject, host, port }