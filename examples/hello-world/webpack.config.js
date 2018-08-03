const path = require('path');
module.exports = {
    mode: "development",
    entry: {
      "client": path.resolve(".", __dirname, "client.js"),
    },
    output: { path: __dirname, filename: 'dist/[name].js' },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['env', 'react', 'stage-0'],
            plugins: ['transform-decorators-legacy' ]
          }
        }
      ]
    },
  };