module.exports = {
  jest: (config) => {
    config.coverageReporters = ['text-summary', 'html']

    return config
  },
}
