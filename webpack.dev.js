const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const packageJson = require("./package");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const port = 3000;
const host = "localhost";

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  entry: { app: "./src/app.ts" },
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    host: host,
    port: port,
    hot: true,
  },
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.([jt])s(x)?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, "src"),
        use: [
          {
            loader: "ts-loader",
            options: { transpileOnly: true },
          },
        ].filter(Boolean),
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"].filter(Boolean),
      },
    ],
  },
  plugins: [
    // new ReactRefreshPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: "./index.html",
      template: __dirname + "/src/index.html",
    }),
  ],
});
