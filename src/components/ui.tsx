import React, { ReactNode, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, styles as s } from '../theme';
import { Icon } from './Icon';
import { GolfDivider } from './GolfDivider';
import { ScreenReveal } from './ScreenReveal';
import { useLayout } from '../hooks/useLayout';
import { usePressMotion } from '../hooks/useMotion';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export function Screen({
  children,
  motionKey,
}: {
  children: ReactNode;
  motionKey?: string | number;
}) {
  const layout = useLayout();
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={s.fill}>
      <KeyboardAvoidingView
        style={s.fill}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardDismissMode="on-drag"
        >
          <ScreenReveal
            replayKey={motionKey}
            style={[
              s.content,
              { padding: layout.padding, gap: layout.gap, paddingBottom: 32 },
            ]}
          >
            {children}
          </ScreenReveal>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export function Heading({
  title,
  eyebrow,
  back,
}: {
  title: string;
  eyebrow?: string;
  back?: () => void;
}) {
  const layout = useLayout();
  return (
    <View style={{ gap: 10 }}>
      {back && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={back}
          style={{
            minHeight: 44,
            justifyContent: 'center',
            alignSelf: 'flex-start',
            width: 44,
          }}
        >
          <Icon name="back" color={colors.text} />
        </Pressable>
      )}
      {eyebrow && <Text style={s.label}>{eyebrow}</Text>}
      <Text
        style={[
          s.title,
          { fontSize: layout.titleSize, lineHeight: layout.titleSize + 6 },
        ]}
      >
        {title}
      </Text>
      <GolfDivider title={title} />
    </View>
  );
}
export function Button({
  title,
  onPress,
  outline = false,
  disabled = false,
}: {
  title: string;
  onPress: () => void | Promise<void>;
  outline?: boolean;
  disabled?: boolean;
}) {
  const motion = usePressMotion();
  const [busy, setBusy] = useState(false);
  const press = async () => {
    if (busy) {
      return;
    }
    setBusy(true);
    try {
      await onPress();
    } catch (error) {
      Alert.alert(
        'Unable to complete',
        error instanceof Error ? error.message : 'Please try again.',
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <AnimatedPressable
      onPressIn={motion.onPressIn}
      onPressOut={motion.onPressOut}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || busy }}
      disabled={disabled || busy}
      onPress={press}
      style={[
        motion.style,
        {
          minHeight: 49,
          flexShrink: 0,
          paddingVertical: 14,
          paddingHorizontal: 14,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.4 : 1,
          borderRadius: 4,
          overflow: 'hidden',
          borderWidth: outline ? 1 : 0,
          borderColor: colors.line,
        },
      ]}
    >
      <LinearGradient
        colors={
          outline
            ? [colors.background, colors.background]
            : ['#CBA95E', '#BD964B']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        pointerEvents="none"
        style={StyleSheet.absoluteFill}
      />
      {busy ? (
        <ActivityIndicator color={outline ? colors.gold : colors.background} />
      ) : (
        <Text
          style={{
            color: outline ? colors.text : '#09121B',
            fontSize: 11,
            letterSpacing: 1.4,
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          {title.toUpperCase()}
        </Text>
      )}
    </AnimatedPressable>
  );
}
export function Choice({
  label,
  selected,
  onPress,
  disabled = false,
}: {
  label: string;
  selected?: boolean;
  onPress: () => void;
  disabled?: boolean;
}) {
  const motion = usePressMotion();
  return (
    <AnimatedPressable
      onPressIn={motion.onPressIn}
      onPressOut={motion.onPressOut}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[
        motion.style,
        {
          minHeight: 48,
          paddingVertical: 13,
          paddingHorizontal: 12,
          borderWidth: 1,
          borderColor: selected ? colors.gold : colors.line,
          borderRadius: 4,
          backgroundColor: selected ? colors.gold : 'transparent',
          opacity: disabled ? 0.3 : 1,
          flexGrow: 1,
          justifyContent: 'center',
        },
      ]}
    >
      <Text
        style={{
          color: selected ? colors.background : colors.text,
          textAlign: 'center',
          fontSize: 13,
        }}
      >
        {label}
      </Text>
    </AnimatedPressable>
  );
}
export function Field({ label, ...props }: TextInputProps & { label: string }) {
  return (
    <View style={{ gap: 8 }}>
      <Text style={s.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={colors.muted}
        {...props}
        style={[s.input, props.style]}
      />
    </View>
  );
}
export function Detail({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <View style={s.row}>
      <Text style={[s.body, { flex: 1 }]}>{label}</Text>
      <Text
        style={[
          s.text,
          { flex: 1, textAlign: 'right' },
          highlight && { color: colors.gold, fontSize: 24 },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}
export function Empty({ text }: { text: string }) {
  return (
    <View style={s.card}>
      <Text style={s.body}>{text}</Text>
    </View>
  );
}
