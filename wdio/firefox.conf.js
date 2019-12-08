const { baseConfig } = require('./base.conf');
const { getFirefoxConfig } = require('./utils');

const firefoxConfig = getFirefoxConfig();

exports.config = {
  ...baseConfig,
  port: parseInt(process.env.WDIO_PORT || 5555),
  capabilities: [firefoxConfig],
};
