const path = require('path');

module.exports = {
  mode: "production",
  //devtool: "inline-source-map",cd
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