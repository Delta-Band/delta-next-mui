import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import multiInput from 'rollup-plugin-multi-input';
import image from '@rollup/plugin-image';

const packageJson = require('./package.json');

export default {
  input: 'src/PdfViewer.js',
  output: [
    {
      dir: 'lib',
      format: 'cjs',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    image(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/env', '@babel/preset-react']
    }),
    commonjs(),
    multiInput()
  ]
};
