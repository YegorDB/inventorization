module.exports = {
  mode: 'development',
  entry: {
    'main': '/src/main.jsx',
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
