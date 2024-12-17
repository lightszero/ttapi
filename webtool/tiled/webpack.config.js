const path = require('path');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: './main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'maindist.js',
    path: path.resolve(__dirname, ''),
  },
  
};