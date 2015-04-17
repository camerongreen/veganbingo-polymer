module.exports = {
  root: '.',
  verbose: true,
  plugins: {
    local: {
      browsers: ['chrome', 'firefox']
    }
  },
  suites: ['app/test']
};
