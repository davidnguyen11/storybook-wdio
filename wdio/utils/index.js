/**
 * Get config of "image-comparison" service
 * @platform could be "pc" (Desktop) - "sp" (Smartphone) - "tb" (Tablet)
 */
function getImageComparisonServiceConfig(platform) {
  return [
    // (see https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#method-options)
    'image-comparison',
    {
      formatImageName: `${platform}-{browserName}-{tag}`,
      clearRuntimeFolder: true,
      savePerInstance: false,
      autoSaveBaseline: true,
      blockOutStatusBar: true,
      blockOutToolBar: true,
      disableCSSAnimation: true,
    },
  ];
}

function getChromeConfig() {
  return {
    maxInstances: 1,
    browserName: 'chrome',
    'goog:chromeOptions': {
      // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
      args: ['--disable-gpu'],
    },
  };
}

function getFirefoxConfig() {
  return {
    // maxInstances can get overwritten per capability. So if you have an in house Selenium
    // grid with only 5 firefox instance available you can make sure that not more than
    // 5 instance gets started at a time.
    maxInstances: 5,
    browserName: 'firefox',
    'moz:firefoxOptions': {
      // flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
      // args: ['-headless']
    },
    // If outputDir is provided WebdriverIO can capture driver session logs
    // it is possible to configure which logTypes to exclude.
    // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
    excludeDriverLogs: ['bugreport', 'server'],
  };
}

module.exports = {
  getChromeConfig,
  getFirefoxConfig,
  getImageComparisonServiceConfig,
};