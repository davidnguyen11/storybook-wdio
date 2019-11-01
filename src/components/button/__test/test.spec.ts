const assert = require('assert');
const path = require('path');
const fs = require('fs');
const ip = require('ip');
import * as style from '../style.less';

console.log(style);
console.log(ip.address());

const url = 'src/components/button/__test/test.spec.ts';
console.log('123123', path.dirname(path.dirname(url)));
console.log('123123', path.dirname(url));

function getTestCaseNames(url: string) {
  return fs.readdirSync(path.join(path.dirname(url), 'data')).map((item: string) => path.basename(item, '.spec.tsx'));
}

const filenames = getTestCaseNames(url);
const componentName = path.basename(path.dirname(path.dirname(url)));

describe(`visual regression for "${componentName}"`, () => {
  filenames.forEach((testCase: string) => {
    const expectedDirPath = path.join(path.dirname(url), 'expected');
    it(`should return the screenshot of "${testCase}"`, () => {  
      if (!fs.existsSync(expectedDirPath)) {
        fs.mkdirSync(expectedDirPath);
      }
      browser.url(`http://${ip.address()}:9090/iframe.html?id=button--${testCase}`);
  
        browser.saveScreenshot(path.join(expectedDirPath, `${componentName}-${testCase}.png`));
        assert.strictEqual(1, 1);
    });
  });
});


