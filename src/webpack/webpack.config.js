module.exports = {
  mode: 'development',
  entry: '/src/main.jsx',
  output: {
    filename: 'main.min.js',
    path: '/static',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};
