import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from './types';
const KEY = '@country-club/state/v1';
const initial: AppState = {
  onboarded: false,
  favorites: [],
  member: null,
  location: null,
  reservations: [],
  rounds: [],
  coupons: [],
  conditions: {
    distance: 135,
    strength: 'Light',
    direction: 'Headwind',
    surface: 'Grass',
  },
};
interface Store {
  state: AppState;
  ready: boolean;
  error: string | null;
  update: (transform: (previous: AppState) => AppState) => Promise<void>;
  retry: () => Promise<void>;
}
const Context = createContext<Store | null>(null);
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initial);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const current = useRef(initial);
  const queue = useRef(Promise.resolve());
  const hydrate = async () => {
    try {
      const raw = await AsyncStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (
          !saved ||
          !Array.isArray(saved.reservations) ||
          !Array.isArray(saved.rounds) ||
          !Array.isArray(saved.favorites) ||
          !Array.isArray(saved.coupons)
        ) {
          throw new Error('Invalid saved data');
        }
        current.current = { ...initial, ...saved };
        setState(current.current);
      }
      setError(null);
      setReady(true);
    } catch {
      setError(
        'Saved data could not be loaded. Retry to keep your existing records safe.',
      );
    }
  };
  useEffect(() => {
    void hydrate();
  }, []);
  const update: Store['update'] = transform => {
    const task = queue.current.then(async () => {
      const next = transform(current.current);
      await AsyncStorage.setItem(KEY, JSON.stringify(next));
      current.current = next;
      setState(next);
    });
    queue.current = task.catch(() => {});
    return task;
  };
  return (
    <Context.Provider value={{ state, ready, error, update, retry: hydrate }}>
      {children}
    </Context.Provider>
  );
}
export function useApp() {
  const value = useContext(Context);
  if (!value) {
    throw new Error('AppProvider is required');
  }
  return value;
}
