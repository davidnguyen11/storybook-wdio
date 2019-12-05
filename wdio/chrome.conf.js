const { baseConfig, ports } = require('./base.conf');

exports.config = {
  ...baseConfig,
  port: parseInt(process.env.WDIO_PORT || 4444),
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      'goog:chromeOptions': {
        // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
        args: ['--disable-gpu'],
      },
    },
  ],
};
