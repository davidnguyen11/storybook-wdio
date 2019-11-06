import * as assert from 'assert';
import * as path from 'path';
import * as fs from 'fs';
import * as ip from 'ip';

import * as style from '../style.less';

console.log(style);
console.log(ip.address());

const url = 'src/components/button/__test/test.spec.ts';
console.log('123123', path.dirname(path.dirname(url)));
console.log('123123', path.dirname(url));

declare global {
  namespace WebdriverIO {
    interface Browser {
      checkElement(
        element: Element,
        tag: string,
        checkElementOptions?: unknown
      ): void;
      saveElement(
        element: Element,
        tag: string,
        saveElementOptions?: unknown
      ): void;
    }

    interface Element {}
  }
}

function getTestCaseNames(url: string) {
  return fs
    .readdirSync(path.join(path.dirname(url), 'data'))
    .map((item: string) => path.basename(item, '.spec.tsx'));
}

const filenames = getTestCaseNames(url);
const componentName = path.basename(path.dirname(path.dirname(url)));

describe(`visual regression for "${componentName}"`, () => {
  filenames.forEach((testCase: string) => {
    const expectedDirPath = path.join(path.dirname(url), 'expected');
    const actualDirPath = path.join(path.dirname(url), 'actual');
    const diffDirPath = path.join(path.dirname(url), 'diff');
    it(`should return the screenshot of "${testCase}"`, () => {
      if (!fs.existsSync(expectedDirPath)) {
        fs.mkdirSync(expectedDirPath);
      }
      browser.url(
        `http://${ip.address()}:9090/iframe.html?id=button--${testCase}`
      );
      /*
       * Why?
       ** The storybook started and generate the class name with hash (A)
       ** The test runs, it imports the style and generate the class name hash (B)
       ** (A) !== (B)
       * Solution
       ** Use the "^=" to get the prefix matched
       */
      const prefixElementContainer = style.container.split('--')[0];
      const screenshotName = `${componentName}-${testCase}`;
      const element = $(`[class^="${prefixElementContainer}"]`);

      // Documentation
      // https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#method-options
      const methodOptions = {
        actualFolder: actualDirPath,
        // The baseline folder and the file name
        baselineFolder: expectedDirPath,
        // This following folder is optional and only if there is a mismatch
        // The folder that holds the diffs and the file name
        diffFolder: diffDirPath,
      };

      assert.equal(browser.checkElement(element, screenshotName, methodOptions), 0);
    });
  });
});
