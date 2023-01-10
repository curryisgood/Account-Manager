let path = require('path');

module.exports = {
  mode: 'none',
  entry: {
    accountBook: './src/accountBook/index.ts',
    signin: './src/sign/signin.ts',
    signup: './src/sign/signup.ts',
    summary: './src/summary/index.ts',
    cssLoader: './src/cssLoader.ts',
  },
  output: {
    path: path.resolve(__dirname, 'bundle'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
  },
};
