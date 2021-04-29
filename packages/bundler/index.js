const path = require('path');
const rollup = require('rollup');
const svelte = require('rollup-plugin-svelte');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const { typescript } = require('svelte-preprocess');

const packages = [
  'flexbox',
  'svebass',
];

async function build(inputOptions, outputOptions) {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  // generate output specific code in-memory
  // you can call this function multiple times on the same bundle object
  await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);

  // closes the bundle
  await bundle.close();
}

const basePlugins = [
  resolve({
    browser: true,
  }),
  commonjs(),
];

packages.forEach((pkg) => {
  const pathname = path.join(__dirname, `../${pkg}`);
  const packageJson = require(path.join(__dirname, `../${pkg}/package.json`));

  const plugins = [...basePlugins, svelte({
    preprocess: typescript({
      tsconfigDirectory: '../../',
    }),
  })];

  const name = packageJson.name
    .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
    .replace(/^\w/, (m) => m.toUpperCase())
    .replace(/-\w/g, (m) => m[1].toUpperCase());

  // see below for details on the options
  const inputOptions = {
    input: `${pathname}/src/index.js`,
    // https://stackoverflow.com/questions/64152594/should-svelte-libraries-include-external-svelte-in-rollup-config-js-func
    // Ignoring svelte and svelte/internal bc otherwise new Svelte components are generated which
    // appears to break (get/set)Context
    external: [...Object.keys(packageJson.dependencies), 'svelte', 'svelte/internal'],
    plugins,
  };

  // Build CSR
  const esOutputOptions = { file: `${pathname}/dist/index.mjs`, format: 'es' };
  const commonOutputOptions = { file: `${pathname}/dist/index.js`, format: 'umd', name };

  build(inputOptions, esOutputOptions);
  build(inputOptions, commonOutputOptions);

  // Build SSR
  // const ssrPlugins = [...basePlugins, svelte({
  //   preprocess: typescript({
  //     tsconfigDirectory: '../../',
  //   }),
  //   compilerOptions: {
  //     generate: 'ssr',
  //     hydratable: true,
  //   },
  // })];

  // const ssrInputOptions = {
  //   ...inputOptions,
  //   plugins: ssrPlugins,
  // };

  // const ssrOutputOptions = { file: `${pkg}/dist/ssr/index.js`, format: 'umd', name };

  // build(ssrInputOptions, ssrOutputOptions);
});
