var path = require("path")
var webpack = require("webpack")

module.exports = {
  devtool: "cheap-module-eval-source-map",
  entry: [
    "webpack-hot-middleware/client",
    "./src/index"
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "client.min.js",
    publicPath: "/dist/"
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        loaders: ["babel-loader"],
        include: [path.resolve(__dirname, "src")]
      }
    ]
  },      
  plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  }