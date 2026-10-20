import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, styles as s } from '../theme';
import { Button } from './ui';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
export function SelectField({
  label,
  value,
  options,
  onChange,
  placeholder = 'Select',
  disabled = false,
}: {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find(option => option.value === value);
  return (
    <View style={styles.field}>
      <Text style={s.label}>{label}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityValue={{ text: selected?.label || placeholder }}
        accessibilityState={{ disabled, expanded: open }}
        disabled={disabled}
        onPress={() => setOpen(true)}
        style={[s.input, s.row, disabled && styles.disabled]}
      >
        <Text style={[s.text, styles.value, !selected && styles.placeholder]}>
          {selected?.label || placeholder}
        </Text>
        <Text style={s.gold}>⌄</Text>
      </Pressable>
      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(false)}
      >
        <SafeAreaView style={styles.overlay}>
          <View accessibilityViewIsModal style={styles.sheet}>
            <Text style={s.subtitle}>{label}</Text>
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              style={styles.list}
              renderItem={({ item }) => (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{
                    selected: item.value === value,
                    disabled: !!item.disabled,
                  }}
                  disabled={item.disabled}
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                  style={[
                    styles.option,
                    item.value === value && styles.selected,
                    item.disabled && styles.disabled,
                  ]}
                >
                  <Text
                    style={[
                      s.text,
                      styles.value,
                      item.value === value && styles.selectedText,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.value === value && (
                    <Text style={styles.selectedText}>✓</Text>
                  )}
                </Pressable>
              )}
              ListEmptyComponent={
                <Text style={s.body}>No options available.</Text>
              }
            />
            <Button outline title="Cancel" onPress={() => setOpen(false)} />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  field: { gap: 8 },
  value: { flex: 1 },
  placeholder: { color: colors.muted },
  disabled: { opacity: 0.4 },
  overlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.background,
    padding: 20,
    gap: 16,
    maxHeight: '85%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  list: { flexGrow: 0 },
  option: {
    minHeight: 52,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  selected: { backgroundColor: colors.gold, borderRadius: 4 },
  selectedText: { color: colors.background },
});
