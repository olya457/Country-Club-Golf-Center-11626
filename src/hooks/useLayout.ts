import { useWindowDimensions } from 'react-native';
export function useLayout() {
  const { width, height, fontScale } = useWindowDimensions();
  const compact = width <= 375 || fontScale > 1.3;
  return {
    width,
    height,
    compact,
    padding: compact ? 14 : 20,
    gap: compact ? 14 : 18,
    titleSize: compact ? 28 : 34,
  };
}
