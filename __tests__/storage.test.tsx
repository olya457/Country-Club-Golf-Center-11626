import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppProvider, useApp } from '../src/state/AppContext';
let store: ReturnType<typeof useApp>;
function Probe() {
  store = useApp();
  return null;
}
beforeEach(() => jest.clearAllMocks());
test('serializes rapid updates and does not publish failed writes', async () => {
  let tree: ReactTestRenderer;
  await act(async () => {
    tree = create(
      <AppProvider>
        <Probe />
      </AppProvider>,
    );
  });
  await act(async () => {
    await Promise.all([
      store.update(state => ({
        ...state,
        favorites: [...state.favorites, 'willow'],
      })),
      store.update(state => ({
        ...state,
        favorites: [...state.favorites, 'cedar'],
      })),
    ]);
  });
  expect(store.state.favorites).toEqual(['willow', 'cedar']);
  (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(
    new Error('disk full'),
  );
  await act(async () => {
    await expect(
      store.update(state => ({ ...state, onboarded: true })),
    ).rejects.toThrow('disk full');
  });
  expect(store.state.onboarded).toBe(false);
  await act(async () => tree!.unmount());
});
