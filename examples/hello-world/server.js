const express = require("express");
const server = require("@gsox/server");
const path = require('path')

const app = express();
server.applyMiddleware(app, {
    host: "localhost",
    port: 3000,
    routes: {
        graphql: "/graphql",
        webhook: "/webhook"
    }
});

app.use('/', express.static(path.join(__dirname)));
app.use('/static', express.static(path.join(__dirname, 'dist')));
