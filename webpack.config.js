// const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin');

// module.exports = {
//   mode: 'production',
//   entry: './src/index.js',
//   output: {
//     path: path.resolve('build'),
//     filename: 'index.js',
//     libraryTarget: 'commonjs2'
//   },
//   watch: true,
//   optimization: {
//     minimizer: [
//       new TerserPlugin({
//         extractComments: false
//       })
//     ]
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         enforce: 'pre',
//         use: [
//           {
//             loader: 'babel-loader',
//             options: {
//               presets: ['@babel/preset-env', '@babel/preset-react']
//             }
//           },
//           'source-map-loader'
//         ]
//       },
//       {
//         test: /\.s[ac]ss$/i,
//         use: [
//           // Creates `style` nodes from JS strings
//           'style-loader',
//           // Translates CSS into CommonJS
//           'css-loader',
//           // Compiles Sass to CSS
//           'sass-loader'
//         ]
//       }
//     ]
//   },
//   externals: {
//     react: 'react'
//   }
// };
