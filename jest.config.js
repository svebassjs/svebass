// jest.config.js
// Sync object
module.exports = {
  verbose: true,
  transform: {
    '^.+\\.svelte$': [
      'svelte-jester',
      {
        preprocess: true,
      },
    ],
    '^.+\\.js$': 'babel-jest',
    // '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: [
    'js',
    // 'ts',
    'svelte',
  ],
};

// Or async function
// module.exports = async () => ({
//   verbose: true,
// });
