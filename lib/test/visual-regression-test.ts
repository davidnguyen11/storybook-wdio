/// <reference types="@wdio/sync/webdriverio"/>

import * as assert from 'assert';
import * as path from 'path';
import * as fs from 'fs';
import * as ip from 'ip';

const STORYBOOK_PORT = 9090;

export class VisualRegressionTest {
  private componentFilePath: string;
  private fileNames: Array<string>;
  private componentName: string;
  private elementClassName?: string;
  private prefixElementWrapperClassName?: string;

  constructor(path: string, elementClassName?: string) {
    this.componentFilePath = path;
    this.fileNames = this.getTestCaseNames();
    this.componentName = this.getComponentFileName();
    this.elementClassName = elementClassName;
    this.prefixElementWrapperClassName = this.elementClassName && this.elementClassName.split('--')[0];
  }

  public run() {
    describe(`visual regression for "${this.componentName}"`, async () => {
      const expectedDirPath = `${this.componentFilePath}/expected`;
      const actualDirPath = `${this.componentFilePath}/actual`;
      const diffDirPath = `${this.componentFilePath}/diff`;
      this.fileNames.forEach((testCase: string) => {
        it(`should return the screenshot of "${testCase}"`, () => {
          this.openTestCase(testCase);
          /*
           * Why?
           ** The storybook started and generate the class name with hash (A)
           ** The test runs, it imports the style and generate the class name hash (B)
           ** (A) !== (B)
           * Solution
           ** Use the "^=" to get the prefix matched
           */
          // const prefixElementContainer = this.elementClassName && this.elementClassName.split('--')[0];
          const screenshotName = `${this.componentName}-${testCase}`;
          const element = this.getElement();

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
  }

  private openTestCase(name: string) {
    browser.url(
      `http://${ip.address()}:${STORYBOOK_PORT}/iframe.html?id=${this.componentName}--${name}`
    );
  }

  private getElement() {
    return $(`[class^="${this.prefixElementWrapperClassName}"]`);
  }

  private getTestCaseNames() {
    return fs
      .readdirSync(path.dirname(`${this.componentFilePath}`))
      .filter((item: string) => item.includes('.story.tsx'))
      .map((item: string) => path.basename(item, '.story.tsx'));
  }

  private getComponentFileName() {
    return path.basename(path.dirname(path.dirname(this.componentFilePath)));
  }
}
