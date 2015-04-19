module.exports = {
  root: '.',
  verbose: false,
  plugins: {
    local: {
      browsers: ['chrome', 'firefox']
    }
  },
  suites: ['app/test']
};
