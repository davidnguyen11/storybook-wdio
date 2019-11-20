const { join } = require('path');
const hook = require('css-modules-require-hook');

exports.config = {
  runner: 'local',
  // hostname: '127.0.0.1',
  // port: 4444,
  specs: ['**/__test/**/index.spec.ts'],
  exclude: [
    // 'path/to/excluded/files'
  ],
  maxInstances: 1,
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
    },
  ],
  services: [
    [
      // https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#method-options
      'image-comparison',
      {
        formatImageName: '{browserName}-{tag}',
        clearRuntimeFolder: true,
        savePerInstance: false,
        autoSaveBaseline: true,
        blockOutStatusBar: true,
        blockOutToolBar: true,
        disableCSSAnimation: true,
      },
    ],
  ],
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
