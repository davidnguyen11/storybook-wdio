import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { dirname, basename, sep } from 'path';

declare const COMPONENT_PATTERN: RegExp;
declare const PROPS_PATTERN: RegExp;

export function generateComponents() {
  const moduleComponents = require.context('../src/components', true,  COMPONENT_PATTERN);
  const moduleProps = require.context('../src/components', true,  PROPS_PATTERN);

  moduleComponents.keys().forEach(spec => {
    const partialPath = dirname(spec).split(sep);
    const componentName = partialPath[partialPath.length - 1];

    const componentModule = moduleComponents(spec);
    const componentExportName = Object.keys(componentModule)[0];
    const Component = componentModule[componentExportName];
    const story = storiesOf(componentName, module);

    /* Filter props belongs to the specific component */
    const dataProps = moduleProps.keys().filter(item => item.startsWith(`${dirname(spec)}${sep}`));

    dataProps.forEach(key => {
      const caseName = basename(key, '.spec.tsx').replace(/-/g, ' ');
      const props = moduleProps(key).test;
      story.add(caseName, () => <Component {...props} />);
    });
  });
}
