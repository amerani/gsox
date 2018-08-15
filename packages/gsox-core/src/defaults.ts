const host = "localhost";

const port = 13000;

const routes = {
      graphql: "/gsox/graphql",
      webhook: "/gsox/webhook",
};

const inject = [];

export { host, port, routes, inject };

export const defaults = { host, port, routes, inject };
