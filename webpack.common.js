const path = require("path");

module.exports = {
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".css", ".scss"],
  },
};
