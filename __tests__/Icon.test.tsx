import React from 'react';
import { Icon, IconName } from '../src/components/Icon';

const names: IconName[] = [
  'home',
  'flag',
  'coach',
  'score',
  'club',
  'coupon',
  'back',
  'heart',
  'scan',
  'wind',
  'rain',
  'pin',
  'settings',
];

test.each(names)('%s has no raw text children inside its SVG', name => {
  const icon = Icon({ name });
  const children = React.Children.toArray(icon.props.children);
  expect(children.length).toBeGreaterThan(0);
  children.forEach(child => expect(React.isValidElement(child)).toBe(true));
});
