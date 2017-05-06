var path = require('path'),
    webpack = require('webpack'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: ["./marx-dev.coffee"],
  devtool: "eval",
  output: {
    path: path.join(__dirname, "build"),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8080,
      server: { baseDir: ['build'] }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        loader: 'riot-tag-loader',
        query: {
          hot: false, // set it to true if you are using hmr
          // add here all the other riot-compiler options riotjs.com/guide/compiler/
          // template: 'pug' for example
        }
      },
      { test: /\.coffee$/, loader: 'coffee-loader' },
      { test: /\.styl$/, loader: 'css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  resolve: {
    extensions: [".js", '.tag', ".coffee", ".styl", ".css"],
  }
};