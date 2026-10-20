import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { useApp } from '../state/AppContext';
import {
  Button,
  Choice,
  Detail,
  Field,
  Heading,
  Screen,
} from '../components/ui';
import {
  Conditions,
  Direction,
  Strength,
  Surface,
  recommendClub,
} from '../utils/clubSelector';
import { clubs } from '../data/catalog';
import { styles as s } from '../theme';
export function SelectorScreen() {
  const { state, update } = useApp();
  const [conditions, setConditions] = useState<Conditions>(state.conditions);
  const [distance, setDistance] = useState(String(state.conditions.distance));
  const [result, setResult] = useState<ReturnType<typeof recommendClub> | null>(
    null,
  );
  const change = <K extends keyof Conditions>(key: K, value: Conditions[K]) =>
    setConditions(old => ({ ...old, [key]: value }));
  const recommend = async () => {
    const selected = { ...conditions, distance: Number(distance) };
    const next = recommendClub(selected);
    await update(previous => ({ ...previous, conditions: selected }));
    setConditions(selected);
    setResult(next);
  };
  if (result) {
    return (
      <Screen motionKey="result">
        <Heading
          title="Your Club"
          eyebrow="Recommendation"
          back={() => setResult(null)}
        />
        <View style={s.card}>
          <Image
            source={result.club.image}
            resizeMode="contain"
            style={{ height: 280, width: '100%' }}
          />
          <Text style={[s.title, s.gold]}>{result.club.name}</Text>
          <Text style={s.body}>{result.explanation}</Text>
          <View style={s.line} />
          <Detail label="Target distance" value={`${conditions.distance} m`} />
          <Detail label="Wind strength" value={conditions.strength} />
          <Detail label="Wind direction" value={conditions.direction} />
          <Detail label="Surface" value={conditions.surface} />
          <Detail label="Playing distance" value={`${result.adjusted} m`} />
        </View>
        <Text style={s.body}>
          Prototype distance rules. Your personal club distances may differ.
        </Text>
        <Button title="Adjust conditions" onPress={() => setResult(null)} />
      </Screen>
    );
  }
  return (
    <Screen motionKey="conditions">
      <Heading title="Club Selector" eyebrow="Smart advice" />
      <Field
        label="Distance · 5–300 metres"
        value={distance}
        onChangeText={setDistance}
        keyboardType="number-pad"
        maxLength={3}
      />
      <View style={s.wrap}>
        {[
          { name: 'Short', value: 60, min: 5, max: 90 },
          { name: 'Medium', value: 135, min: 91, max: 180 },
          { name: 'Long', value: 235, min: 181, max: 300 },
        ].map(range => (
          <Choice
            key={range.name}
            label={`${range.name}\n${range.min}–${range.max} m`}
            selected={
              Number(distance) >= range.min && Number(distance) <= range.max
            }
            onPress={() => setDistance(String(range.value))}
          />
        ))}
      </View>
      <Text style={s.label}>Wind strength & direction</Text>
      <View style={s.wrap}>
        {(['Light', 'Moderate', 'Strong'] as Strength[]).map((value, index) => (
          <Choice
            key={value}
            label={`${value}\n${['0–10', '11–25', '>25'][index]} km/h`}
            selected={conditions.strength === value}
            onPress={() => change('strength', value)}
          />
        ))}
      </View>
      <View style={s.wrap}>
        {(['Headwind', 'Tailwind', 'Crosswind'] as Direction[]).map(value => (
          <Choice
            key={value}
            label={value}
            selected={conditions.direction === value}
            onPress={() => change('direction', value)}
          />
        ))}
      </View>
      <Text style={s.label}>Surface</Text>
      <View style={s.wrap}>
        {(['Sand', 'Grass', 'Dirt'] as Surface[]).map(value => (
          <Choice
            key={value}
            label={value}
            selected={conditions.surface === value}
            onPress={() => change('surface', value)}
          />
        ))}
      </View>
      <Button title="Recommend club" onPress={recommend} />
      <View
        style={{
          height: 200,
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 8,
        }}
      >
        <Image
          source={clubs[15].image}
          resizeMode="contain"
          style={{
            width: '48%',
            height: 190,
            transform: [{ rotate: '-15deg' }],
          }}
        />
        <Image
          source={clubs[6].image}
          resizeMode="contain"
          style={{
            width: '48%',
            height: 190,
            transform: [{ rotate: '15deg' }],
          }}
        />
      </View>
    </Screen>
  );
}
