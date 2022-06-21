module.exports = {
  mode: 'development',
  entry: {
    'index': '/src/index.jsx',
    'item': '/src/item.jsx',
    'profile': '/src/profile.jsx',
  },
  output: {
    filename: '[name].min.js',
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
