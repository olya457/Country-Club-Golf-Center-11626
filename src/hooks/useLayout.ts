import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
export function useLayout() {
  const { width, height, fontScale } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const availableWidth = width - insets.left - insets.right;
  const compact = availableWidth <= 375 || fontScale > 1.3;
  return {
    width,
    height,
    contentWidth: Math.max(
      0,
      Math.min(availableWidth, 680) - (compact ? 28 : 40),
    ),
    compact,
    wide: availableWidth >= 600 && fontScale <= 1.3,
    padding: compact ? 14 : 20,
    gap: compact ? 14 : 18,
    titleSize: compact ? 28 : 34,
  };
}
