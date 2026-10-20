import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { colors } from '../theme';
import { useReducedMotion } from '../hooks/useMotion';

export function GolfDivider({ title }: { title: string }) {
  const reduced = useReducedMotion();
  const progress = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    progress.stopAnimation();
    if (reduced) {
      progress.setValue(1);
      return;
    }
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: 700,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
    return () => progress.stopAnimation();
  }, [progress, reduced, title]);
  return (
    <View style={styles.track} accessible={false} pointerEvents="none">
      <Animated.View
        style={[
          styles.trail,
          { opacity: progress, transform: [{ scaleX: progress }] },
        ]}
      />
      <Animated.View
        style={[
          styles.ball,
          {
            opacity: progress,
            transform: [
              {
                translateX: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 62],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  track: { height: 1, backgroundColor: colors.line, marginVertical: 8 },
  trail: {
    position: 'absolute',
    width: 64,
    height: 1,
    backgroundColor: colors.gold,
  },
  ball: {
    position: 'absolute',
    top: -2,
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.gold,
  },
});
