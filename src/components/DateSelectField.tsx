import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SelectField } from './SelectField';

export function DateSelectField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [draft, setDraft] = React.useState(value);
  const date = value || draft;
  const [year = '', month = '', day = ''] = date.split('-');
  const maxDay = new Date(
    Number(year) || new Date().getFullYear(),
    Number(month) || 1,
    0,
  ).getDate();
  const change = (index: number, next: string) => {
    const parts = [year, month, day];
    parts[index] = next;
    const limit = new Date(
      Number(parts[0]) || new Date().getFullYear(),
      Number(parts[1]) || 1,
      0,
    ).getDate();
    if (Number(parts[2]) > limit) {
      parts[2] = String(limit).padStart(2, '0');
    }
    const updated = parts.join('-');
    setDraft(updated);
    if (parts.every(Boolean)) {
      onChange(updated);
    }
  };
  const currentYear = new Date().getFullYear();
  const years = [
    ...Array.from({ length: 101 }, (_, index) => currentYear + index),
    ...Array.from(
      { length: currentYear - 1900 },
      (_, index) => currentYear - index - 1,
    ),
  ];
  if (year && !years.includes(Number(year))) {
    years.push(Number(year));
  }
  return (
    <View style={styles.row}>
      <View style={styles.column}>
        <SelectField
          label={`${label} · Year`}
          value={year}
          placeholder="Year"
          options={years.map(item => ({
            value: String(item),
            label: String(item),
          }))}
          onChange={next => change(0, next)}
        />
      </View>
      <View style={styles.column}>
        <SelectField
          label="Month"
          value={month}
          placeholder="Month"
          options={Array.from({ length: 12 }, (_, index) => ({
            value: String(index + 1).padStart(2, '0'),
            label: new Date(2000, index, 1).toLocaleDateString('en-US', {
              month: 'short',
            }),
          }))}
          onChange={next => change(1, next)}
        />
      </View>
      <View style={styles.column}>
        <SelectField
          label="Day"
          value={day}
          placeholder="Day"
          options={Array.from({ length: maxDay }, (_, index) => ({
            value: String(index + 1).padStart(2, '0'),
            label: String(index + 1),
          }))}
          onChange={next => change(2, next)}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'flex-end',
  },
  column: { flex: 1, minWidth: 90 },
});
