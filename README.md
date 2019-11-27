# Storybook Visual Regression boilerplate

[![Build Status](https://travis-ci.com/davidnguyen179/storybook-visual-regression-testing-boilerplate.svg?token=8bxp2xLSAoW15sG7fwhv&branch=master)](https://travis-ci.com/davidnguyen179/storybook-visual-regression-testing-boilerplate) [![CircleCI](https://circleci.com/gh/davidnguyen179/storybook-visual-regression-testing-boilerplate.svg?style=svg)](https://circleci.com/gh/davidnguyen179/storybook-visual-regression-testing-boilerplate)

<hr />

## Visual regression testing

**Docker image**

[https://hub.docker.com/r/selenium/standalone-chrome-debug](https://hub.docker.com/r/selenium/standalone-chrome-debug)

**Run docker**

```bash
docker run -d -p 4444:4444 -p 5900:5900 selenium/standalone-chrome-debug
```

**Screen Sharing**

For debug with visual regression testing.

*Mac*

Open the `Screen Sharing`

- Hostname: `YOUR_MACHINE_IP`:5900
- Password: secret
