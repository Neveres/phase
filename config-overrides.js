module.exports = {
  jest: (config) => {
    config.coverageReporters = ['text-summary', 'html']
    config.setupFiles = ['jest-webgl-canvas-mock', ...config.setupFiles]

    return config
  },
}
