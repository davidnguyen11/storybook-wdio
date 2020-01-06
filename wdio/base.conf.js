const hook = require('css-modules-require-hook');
const { getImageComparisonServiceConfig } = require('./utils')
const { PLATFORM }  = require('./utils');

exports.baseConfig = {
  runner: 'local',
  hostname: process.env.WDIO_HOST || '127.0.0.1',
  specs: ['**/stories/vr-test/**/index.spec.ts'],
  exclude: [
    // 'path/to/excluded/files'
  ],
  maxInstances: 1,
  services: [getImageComparisonServiceConfig(PLATFORM.desktop)],
  sync: true,
  logLevel: 'error',
  deprecationWarnings: true,
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 100,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    retries: 2,
    require: ['tsconfig-paths/register'],
  },
  before: function(capabilities, specs) {
    // require('ts-node/register');
    require('ts-node').register({ files: true });
    browser.setWindowSize(1376, 798);
  },
  beforeSession: function() {
    // require.extensions['.less'] = require.extensions['.less'];
    /*
     * When runs the test, it doesn't understand `.less` syntax
     * So before running test, need to pre-compile the `.less`
     */
    hook({
      camelCase: true,
      extensions: '.less',
      generateScopedName: '[local]--[hash:base64:5]',
    });
  },
};
