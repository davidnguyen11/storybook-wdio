const { baseConfig } = require('./base.conf');
const { getImageComparisonServiceConfig, getFirefoxConfig } = require('./utils');

const firefoxConfig = getFirefoxConfig();

exports.config = {
  ...baseConfig,
  port: parseInt(process.env.WDIO_PORT || 5555),
  capabilities: [firefoxConfig],
  services: [getImageComparisonServiceConfig('sp')],
  before: function() {
    baseConfig.before();
    /*
     * The size of iPhone 6
     */
    browser.setWindowSize(375, 687);
  },
};
