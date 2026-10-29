import React from 'react';
import { Alert, Linking } from 'react-native';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { LearnScreen, openLearningResource } from '../src/screens/LearnScreen';
import { Button } from '../src/components/ui';
import { resources } from '../src/data/learn';

jest.mock('../src/hooks/useMotion', () => ({
  useReducedMotion: () => true,
  usePressMotion: () => ({ style: {} }),
}));

test('learn sections expose rules, course, clubs and external lessons', async () => {
  let tree: ReactTestRenderer.ReactTestRenderer;
  await act(async () => {
    tree = ReactTestRenderer.create(<LearnScreen />);
  });
  expect(JSON.stringify(tree!.toJSON())).toContain(
    'Lost ball or out of bounds',
  );
  const select = async (label: string) => {
    const tab = tree!.root.findByProps({ accessibilityLabel: label });
    await act(async () => tab!.props.onPress());
  };
  await select('Course');
  expect(JSON.stringify(tree!.toJSON())).toContain('Green & fringe');
  await select('Clubs');
  expect(JSON.stringify(tree!.toJSON())).toContain('Hybrids');
  const watch = tree!.root
    .findAllByType(Button)
    .find(item => item.props.title === 'Watch lessons by club type');
  await act(async () => watch!.props.onPress());
  expect(JSON.stringify(tree!.toJSON())).toContain(
    'Fairway woods, hybrids & irons',
  );
  const open = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);
  const videos = tree!.root.findAllByType(Button);
  await act(async () => videos[0].props.onPress());
  expect(open).toHaveBeenCalledWith(
    resources.find(item => item.kind === 'Video')!.url,
  );
  await select('Articles');
  expect(tree!.root.findAllByType(Button)).toHaveLength(3);
  await act(async () => tree!.unmount());
  open.mockRestore();
});

test('failed external links show a retryable error', async () => {
  const open = jest
    .spyOn(Linking, 'openURL')
    .mockRejectedValue(new Error('Unavailable'));
  const alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  await openLearningResource(resources[0].url);
  expect(alert).toHaveBeenCalledWith(
    'Unable to open link',
    expect.stringContaining('try again'),
  );
  open.mockRestore();
  alert.mockRestore();
});
