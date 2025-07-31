module.exports = {
  plugins: {
    'postcss-short': { prefix: 'x' },
    'postcss-preset-env': {
      features: {
        'nesting-rules': true,
      },
    },
  },
};
