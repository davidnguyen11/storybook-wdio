# Storybook Visual Regression boilerplate

[![Build Status](https://travis-ci.com/davidnguyen179/storybook-wdio.svg?branch=master)](https://travis-ci.com/davidnguyen179/storybook-wdio) [![CircleCI](https://circleci.com/gh/davidnguyen179/storybook-wdio.svg?style=svg)](https://circleci.com/gh/davidnguyen179/storybook-wdio) [![GithubCI](https://github.com/davidnguyen179/storybook-visual-regression-testing-boilerplate/workflows/CI/badge.svg)](https://github.com/davidnguyen179/storybook-visual-regression-testing-boilerplate/actions)

<hr />

## Visual regression testing

**Docker image**

[https://hub.docker.com/r/selenium/standalone-chrome-debug](https://hub.docker.com/r/selenium/standalone-chrome-debug)

**Start selenium chrome & firefox with docker-compose  **

```bash
docker-compose up
```

*Advance* You can customize export ports by arguments if default ports are already allocated
- CHROME_MAIN_PORT: main port for selenium chrome. Default: 4444
- CHROME_DEBUG_PORT: main port for selenium chrome - for screen sharing. Default: 5900
- FIREFOX_MAIN_PORT: main port for selenium firefox. Default: 5555
- FIREFOX_DEBUG_PORT: main port for selenium firefox - for screen sharing. Default: 5901

Example
```bash
CHROME_MAIN_PORT=6666 CHROME_DEBUG_PORT=5909 docker-compose up
```

**Screen Sharing**

For debug with visual regression testing.

*Mac*

Open the `Screen Sharing`

*chrome*

- Hostname: `YOUR_MACHINE_IP`:5900
- Password: secret

*firefox*

- Hostname: `YOUR_MACHINE_IP`:5901
- Password: secret

**Run test**

Make sure your storybook started

```bash
npm run storybook
```

Run all tests

```bash
npm test
```

Run specific test

```bash
npm test <relative_path_to_component_to_index.spec.ts>
```

Example:

```bash
npm test src/components/button/tests/index.spec.ts
```

```bash
npm test src/components/text/tests/index.spec.ts
```

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.dzungnguyen.dev/about"><img src="https://avatars3.githubusercontent.com/u/6290720?s=460&v=4" width="100px;" alt=""/><br /><sub><b>Dzung Nguyen</b></sub></a><br /><a href="https://github.com/davidnguyen179/storybook-wdio/commits?author=davidnguyen179" title="Documentation">📖</a> <a href="https://github.com/davidnguyen179/storybook-wdio/commits?author=davidnguyen179" title="Code">💻</a> <a href="#ideas-davidnguyen179" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/davidnguyen179/storybook-wdio/pulls?q=is%3Apr+reviewed-by%3Adavidnguyen179" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/davidnguyen179/storybook-wdio/issues?q=author%3Adavidnguyen179" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/nvhoc"><img src="https://avatars3.githubusercontent.com/u/7335034?s=460&v=4" width="100px;" alt=""/><br /><sub><b>Hoc Nguyen</b></sub></a><br /><a href="https://github.com/davidnguyen179/storybook-wdio/commits?author=nvhoc" title="Code">💻</a> <a href="#ideas-nvhoc" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/davidnguyen179/storybook-wdio/pulls?q=is%3Apr+reviewed-by%3Anvhoc" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/davidnguyen179/storybook-wdio/issues?q=author%3Anvhoc" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/conandk"><img src="https://avatars3.githubusercontent.com/u/12934183?s=460&v=4" width="100px;" alt=""/><br /><sub><b>Khoa Do</b></sub></a><br /><a href="https://github.com/davidnguyen179/storybook-wdio/commits?author=conandk" title="Code">💻</a> <a href="https://github.com/davidnguyen179/storybook-wdio/pulls?q=is%3Apr+reviewed-by%3Aconandk" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/davidnguyen179/storybook-wdio/issues?q=author%3Aconandk" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://haoict.github.io"><img src="https://avatars1.githubusercontent.com/u/7247750?v=4" width="100px;" alt=""/><br /><sub><b>Nguyen Van Hao</b></sub></a><br /><a href="https://github.com/davidnguyen179/storybook-wdio/commits?author=haoict" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
