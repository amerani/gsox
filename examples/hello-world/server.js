const express = require("express");
const server = require("@gsox/server");
const React = require('react');
const ReactDOMServer = require("react-dom/server");
const DOM = require('react-dom-factories')
const path = require('path')
const body = DOM.body, div = DOM.div, script = DOM.script

const app = express();
server.createServer(app, {
    host: "localhost",
    port: 3000
}, {
    graphql: "/graphql",
    webhook: "/webhook"
});

app.use('/static', express.static(path.join(process.cwd(), "dist")));

app.get("/client", function (req, res) {
    const html = ReactDOMServer.renderToStaticMarkup(body(null,
        div({id: 'content'}),
        script({type: "text/javascript", src: 'http://localhost:8080/examples/hello-world/dist/client.js'})
      ))
      res.end(html)
});
