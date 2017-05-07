var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './app/javascripts/marx'
  ],
  devtool: 'eval',
  output: {
    path: __dirname,
    filename: "index.js",
    library: 'marxjs',
    libraryTarget: 'umd'
  },
  resolveLoader: {
    modules: ['..', 'node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      // This has effect on the react lib size.
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.IgnorePlugin(/vertx/),
    new webpack.IgnorePlugin(/configs/),
    new webpack.IgnorePlugin(/un~$/),
    new webpack.optimize.UglifyJsPlugin(),
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
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  resolve: {
    extensions: [".js", '.tag', ".coffee", ".styl", ".css"],
  }
};