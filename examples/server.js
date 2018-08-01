const express = require("express");
const server = require("../packages/gsox-server/lib");
const React = require('react');
const ReactDOMServer = require("react-dom/server");
const { DataProvider } = require("../packages/gsox-client/lib")
const DOM = require('react-dom-factories')
const path = require('path')
const div = DOM.div, button = DOM.button, ul = DOM.ul, li = DOM.li, body = DOM.body, script = DOM.script
const ws = require('ws');

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
        div({
          id: 'content',
          dangerouslySetInnerHTML: {__html: ReactDOMServer.renderToString(React.createElement(DataProvider, { ws } ))},
        }),

        script({type: "text/javascript", src: 'http://localhost:8080/examples/dist/bundle.js'})
      ))

      res.end(html)
});
