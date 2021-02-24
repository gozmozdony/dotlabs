const path = require('path');

module.exports = {
  entry: "./src/index.ts",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
            /node_modules/
        ]
      }
    ]
  },
  target: 'node',
  externals: {
    // These modules are already installed on the Lambda instance.
    'awslambda': 'awslambda'
  },
  node: {
    // Allow these globals.
    __filename: false,
    __dirname: false
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      '@': path.resolve('src')
    }
  },
  optimization: {
    minimize: false
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
  }
};
