import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import App from '../App';
test('launches into the branded splash and transitions after animation', async () => {
  jest.useFakeTimers();
  let tree: ReactTestRenderer.ReactTestRenderer;
  await act(async () => {
    tree = ReactTestRenderer.create(<App />);
  });
  const webview = tree!.root.findByType('WebView' as never);
  expect(webview.props.source.html).toContain('4000');
  await act(async () => {
    webview.props.onMessage({ nativeEvent: { data: 'complete' } });
  });
  expect(JSON.stringify(tree!.toJSON())).toContain('Welcome to Your Club');
  await act(async () => tree!.unmount());
  jest.useRealTimers();
});
