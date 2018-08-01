const path = require('path');
module.exports = {
    mode: "development",
    entry: path.resolve(".", __dirname, "client.js"),
    output: { path: __dirname, filename: 'dist/bundle.js' },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['env', 'react']
          }
        }
      ]
    },
  };