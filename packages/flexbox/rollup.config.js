import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { typescript } from 'svelte-preprocess';

import pkg from './package.json';

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase());

const plugins = [
  resolve({
    browser: true,
  }),
  commonjs(),
  svelte({
    preprocess: typescript({
      tsconfigDirectory: '../../',
    }),
    // compilerOptions: {
    //   generate: 'ssr',
    //   hydratable: true,
    // },
  }),
];

const output = [
  { file: `${pkg.module}`, format: 'es' },
  { file: `${pkg.main}`, format: 'umd', name },
];

const external = Object.keys(pkg.dependencies);

export default {
  input: './src/index.js',
  // https://stackoverflow.com/questions/64152594/should-svelte-libraries-include-external-svelte-in-rollup-config-js-func
  // Ignoring svelte and svelte/internal bc otherwise new Svelte components are generated which
  // appears to break (get/set)Context
  external: [...external, 'svelte', 'svelte/internal'],
  output,
  plugins,
};
