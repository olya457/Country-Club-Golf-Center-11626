import React, { ReactNode, useContext, useEffect, useRef } from 'react';
import { Animated, Easing, StyleProp, ViewStyle } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { useReducedMotion } from '../hooks/useMotion';

export function ScreenReveal({
  children,
  style,
  replayKey,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  replayKey?: string | number;
}) {
  const navigation = useContext(NavigationContext);
  const reduced = useReducedMotion();
  const progress = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const enter = () => {
      progress.stopAnimation();
      if (reduced) {
        progress.setValue(1);
        return;
      }
      progress.setValue(0);
      Animated.timing(progress, {
        toValue: 1,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    };
    if (!navigation || navigation.isFocused()) {
      enter();
    }
    const unsubscribe = navigation?.addListener('focus', enter);
    return () => {
      unsubscribe?.();
      progress.stopAnimation();
    };
  }, [navigation, progress, reduced, replayKey]);
  return (
    <Animated.View
      style={[
        style,
        {
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.35, 1],
          }),
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [16, 0],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
