const host = "localhost";

const port = 13000;

const routes = {
      graphql: "/gsox/graphql",
      webhook: "/gsox/webhook",
};

export { host, port, routes };

export const defaults = { host, port, routes };
