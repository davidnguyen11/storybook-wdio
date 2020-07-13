# Storybook Visual Regression boilerplate

<p align="center">
  <img width="500" alt="Storybook Visual Regression boilerplate" src="https://user-images.githubusercontent.com/6290720/71781300-51e82600-3010-11ea-86e3-83af5a3a0e20.png" />
  <br />
  <br />
</p>

Storybook boilerplate which combines ReactJS, Typescript and Visual Regression testing using [WebDriverIO](https://webdriver.io/)

[![Build Status](https://travis-ci.com/davidnguyen179/storybook-wdio.svg?branch=master)](https://travis-ci.com/davidnguyen179/storybook-wdio)

<hr />

- [Storybook Visual Regression boilerplate](#storybook-visual-regression-boilerplate)
  - [Motivation](#motivation)
  - [Getting started](#getting-started)
  - [How to create a React Component along with a Story](#how-to-create-a-react-component-along-with-a-story)
    - [Structure](#structure)
    - [Component template](#component-template)
    - [Creating a Story](#creating-a-story)
  - [Visual Regression Testing](#visual-regression-testing)
    - [Run selenium Docker image](#run-selenium-docker-image)
    - [Create entry test file](#create-entry-test-file)
    - [Run the visual regression test](#run-the-visual-regression-test)
    - [Debug visual regression test](#debug-visual-regression-test)
      - [Mac](#mac)
  - [Contributors ✨](#contributors)

## Motivation

 As we all know ReactJS continues to lead the way as far as being the most widely used Javascript library and in the opinion of many, the most powerful. If you combine ReactJS with Storybook and visual regression testing from Webdriver IO it is possible to create a design system and a custom component library that can be safely reused between products and/or other teams. Sometimes when sharing a UI library among a large group or multiple teams we run in to issues when one person makes what might seem to be trivial or small change to a shared component. These changes might cause issues for other users who are using the same component in another place. Often times small modifications or changes can slip through code reviews too. With this boilerplate we incorporated the ability to run visual regression testing on each component. This allows developers to see even the slightest of changes and decide if it is acceptible or not before commiting to the changes.

## Getting started

To run this project please follow these steps:

1. Make sure you have [Docker](https://www.docker.com/products/docker-desktop) & [NodeJS](https://nodejs.org/en/) installed on your machine
2. Pull the [standalone-chrome-debug](https://hub.docker.com/r/selenium/standalone-chrome-debug) or [standalone-firefox-debug](https://hub.docker.com/r/selenium/standalone-firefox-debug/) docker image
3. Clone this repo
4. Install dependencies

```bash
npm install
```
5. Start storybook with development mode

```bash
npm run storybook
```

## How to create a React Component along with a Story

### Structure

```bash
my-react-component
  |-- stories/
      |-- vr-test/
          |-- index.spec.ts
      |-- story-1.story.tsx
      |-- story-2.story.tsx
      |-- story-3.story.tsx
  |-- index.tsx
  |-- style.less
```

### Component template

**src/components/button/index.tsx**

```tsx
import * as React from 'react';
import * as style from './style.less';

export class Button extends React.Component<Props> {
  public render(): JSX.Element {
    const className = [style.container, style[this.props.size || '']];

    return (
      <button onClick={this.props.onClick} id="button" className={className.join(' ')}>
        {this.props.children}
      </button>
    );
  }
}

export type Props = DataProps & EventProps;

interface DataProps {
  /** Children node */
  children: string | React.ReactNode;
  /** Size of button */
  size?: 'small' | 'medium' | 'large';
}

interface EventProps {
  /** Click event */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
```

**src/components/button/style.less**

```css
.container {
  background: blue;
  width: 100%;
}

.small {
  background: yellow;
}

.medium {
  background: green;
}

.large {
  background: red;
}
```

### Creating a Story

File name pattern: `src/components/<component-name>/stories/<test-case-name>.story.tsx`

Example:

**src/components/button/stories/large.story.tsx**

```tsx
import { Props } from '..'; // import the Props from the component

export const test: Props = {
  children: 'large size',
  size: 'large',
};
```

**src/components/button/stories/small.story.tsx**

```tsx
import { Props } from '..'; // import the Props from the component

export const test: Props = {
  children: 'small size',
  size: 'small',
};
```

## Visual Regression Testing

This type of testing produces snapshots of the component as `*.png` files.

*For example:*

Here is a visual regression test for `button` component

**button with large size**

<p>
  <img alt="button large" src="https://raw.githubusercontent.com/davidnguyen179/storybook-wdio/master/src/components/button/stories/vr-test/expected/desktop-chrome-button-large.png" />
</p>

**button with medium size**

<p>
  <img alt="button medium" src="https://raw.githubusercontent.com/davidnguyen179/storybook-wdio/master/src/components/button/stories/vr-test/expected/desktop-chrome-button-medium.png" />
</p>

**button with small size**

<p>
  <img alt="button small" src="https://raw.githubusercontent.com/davidnguyen179/storybook-wdio/master/src/components/button/stories/vr-test/expected/desktop-chrome-button-small.png" />
</p>

Here is a visual regression test for `text` component

**text with black background**

<p>
  <img alt="button medium" src="https://raw.githubusercontent.com/davidnguyen179/storybook-wdio/master/src/components/text/stories/vr-test/expected/desktop-chrome-text-with-black-background.png" />
</p>

**text with red background**

<p>
  <img alt="button small" src="https://raw.githubusercontent.com/davidnguyen179/storybook-wdio/master/src/components/text/stories/vr-test/expected/desktop-chrome-text-with-red-background.png" />
</p>

After completing the React component, to run the visual regression test, you need to do a little set up.

### Run selenium Docker image

> Make sure to start Docker

To run Selenium of web drivers, you can choose either running Docker commands

```bash
docker run -d -p 4444:4444 -p 5900:5900 selenium/standalone-chrome-debug
```

or using `docker-compose.yml`

```bash
docker-compose up
```

**Advance:** You can customize export ports by arguments if default ports are already allocated

| Port               | Default | Description                                         |
| ------------------ | ------- | --------------------------------------------------- |
| CHROME_MAIN_PORT   | 4444    | port of selenium chrome                             |
| CHROME_DEBUG_PORT  | 5900    | port of selenium chrome debug - for screen sharing  |
| FIREFOX_MAIN_PORT  | 5555    | port of selenium firefox                            |
| FIREFOX_DEBUG_PORT | 5901    | port of selenium firefox debug - for screen sharing |

Example
```bash
CHROME_MAIN_PORT=6666 CHROME_DEBUG_PORT=5909 docker-compose up
```

### Create entry test file

Create the file `src/components/<component-name>/stories/vr-test/index.spec.ts` with code below

```ts
import { VisualRegressionTest } from 'lib/test/visual-regression-test';
import * as style from '../../style.less';

new VisualRegressionTest(__dirname, style.container).run();
```

> `style.container` is the className wrapped around the component

### Run the visual regression test

> To run the visual regression test, make sure your `storybook` started.

**Desktop**

```bash
npm run test:chrome src/components/<component-name>/stories/vr-test/index.spec.ts
```

**Smartphone**

```bash
npm run test:chrome:smartphone src/components/<component-name>/stories/vr-test/index.spec.ts
```

**Both Desktop and Smartphone**

```bash
npm test src/components/<component-name>/stories/vr-test/index.spec.ts
```

**Run all tests**

```bash
npm test
```

### Debug visual regression test

#### Mac

**Screen Sharing**

To debug visual regression testing

1. Open the `Screen Sharing`
```bash
chrome

Hostname: `YOUR_MACHINE_IP`:5900
Password: secret
```
2. Run test
3. Navigate to `Screen Sharing` to see the step by step for running the test

## Contributors ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.dzungnguyen.dev/about"><img src="https://avatars3.githubusercontent.com/u/6290720?s=460&v=4" width="100px;" alt=""/><br /><sub><b>Dzung Nguyen</b></sub></a><br /><a href="https://github.com/davidnguyen179/storybook-wdio/commits?author=davidnguyen179" title="Documentation">📖</a> <a href="https://github.com/davidnguyen179/storybook-wdio/commits?author=davidnguyen179" title="Code">💻</a> <a href="#ideas-davidnguyen179" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/davidnguyen179/storybook-wdio/pulls?q=is%3Apr+reviewed-by%3Adavidnguyen179" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/davidnguyen179/storybook-wdio/issues?q=author%3Adavidnguyen179" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/nvhoc"><img src="https://avatars3.githubusercontent.com/u/7335034?s=460&v=4" width="100px;" alt=""/><br /><sub><b>Hoc Nguyen</b></sub></a><br /><a href="https://github.com/davidnguyen179/storybook-wdio/commits?author=nvhoc" title="Code">💻</a> <a href="#ideas-nvhoc" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/davidnguyen179/storybook-wdio/pulls?q=is%3Apr+reviewed-by%3Anvhoc" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/davidnguyen179/storybook-wdio/issues?q=author%3Anvhoc" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/conandk"><img src="https://avatars3.githubusercontent.com/u/12934183?s=460&v=4" width="100px;" alt=""/><br /><sub><b>Khoa Do</b></sub></a><br /><a href="https://github.com/davidnguyen179/storybook-wdio/commits?author=conandk" title="Code">💻</a> <a href="https://github.com/davidnguyen179/storybook-wdio/pulls?q=is%3Apr+reviewed-by%3Aconandk" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/davidnguyen179/storybook-wdio/issues?q=author%3Aconandk" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://haoict.github.io"><img src="https://avatars1.githubusercontent.com/u/7247750?v=4" width="100px;" alt=""/><br /><sub><b>Nguyen Van Hao</b></sub></a><br /><a href="https://github.com/davidnguyen179/storybook-wdio/commits?author=haoict" title="Code">💻</a> <a href="https://github.com/davidnguyen179/storybook-wdio/commits?author=haoict" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/3BenLee"><img src="https://avatars2.githubusercontent.com/u/35267414?v=4" width="100px;" alt=""/><br /><sub><b>Ben Lee</b></sub></a><br /><a href="https://github.com/davidnguyen179/storybook-wdio/commits?author=3BenLee" title="Documentation">📖</a> <a href="https://github.com/davidnguyen179/storybook-wdio/commits?author=3BenLee" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

