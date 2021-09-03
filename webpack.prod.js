const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: { app: "./src/index.tsx" },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "lib"),
    publicPath: "/",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        query: {
          declaration: true,
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]-[hash:base64:6]",
              },
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              data:
                "@import './src/common/styles/themes/_theme-" +
                process.env.BRANDINGNAME +
                "';",
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM",
    },
  },
  optimization: {},
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],
};
