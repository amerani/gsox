import * as types from './types';

const routes = { graphql: "/graphql", webhook: "/gsox/webhook" };

const inject = [...Object.values(types)];

export { routes, inject }