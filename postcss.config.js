module.exports = {
  // You can specify any options from https://postcss.org/api/#processoptions here
  // parser: 'sugarss',
  plugins: [
    // Plugins for PostCSS
    ["postcss-short", { prefix: "x" }],
    "postcss-preset-env",
    {
      "postcss-cssnext": {
        browsers: ["last 5 versions", "> 50%"],
      },
    },
  ],
};
