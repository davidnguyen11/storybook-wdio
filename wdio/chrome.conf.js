const { baseConfig } = require('./base.conf');
const { getChromeConfig } = require('./utils');

const chromeConfig = getChromeConfig();

exports.config = {
  ...baseConfig,
  port: parseInt(process.env.WDIO_PORT || 4444),
  capabilities: [chromeConfig],
};
