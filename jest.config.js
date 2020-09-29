module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  verbose: true,
  testURL: "http://localhost/",
  'transform': {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: ['**/__tests__/*.js?(x)'],
}
