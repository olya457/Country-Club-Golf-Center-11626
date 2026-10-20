import { useLayout } from '../hooks/useLayout';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FeatureStack } from '../navigation/types';
import { coaches } from '../data/catalog';
import { useApp } from '../state/AppContext';
import { Button, Heading, Screen } from '../components/ui';
import { ReservationCard } from '../components/ReservationCard';
import { styles as s } from '../theme';
export function CoachesScreen({
  navigation,
}: NativeStackScreenProps<FeatureStack, 'List'>) {
  const { state } = useApp();
  const layout = useLayout();
  return (
    <Screen>
      <Heading title="Coaches" eyebrow="Private instruction" />
      {state.reservations
        .filter(r => r.kind === 'coach' && !r.cancelled)
        .map(r => (
          <ReservationCard key={r.id} reservation={r} cancellable />
        ))}
      {coaches.map((coach, index) => (
        <View style={s.card} key={coach.id}>
          <View
            style={[
              s.row,
              layout.compact && {
                flexDirection: 'column',
                alignItems: 'stretch',
              },
            ]}
          >
            <Image
              source={coach.image}
              style={
                layout.compact
                  ? { width: '100%', height: 180 }
                  : { width: 92, height: 140 }
              }
            />
            <View style={{ flex: layout.compact ? undefined : 1, gap: 8 }}>
              <Text style={s.subtitle}>{coach.name}</Text>
              <Text style={s.label}>{coach.level}</Text>
              <Text style={s.body}>
                {coach.years} years · {coach.specialty}
              </Text>
              <Text style={s.text}>
                Match ${coach.price} · Training ${coach.price + 10}
              </Text>
            </View>
          </View>
          <Button
            title="View coach"
            onPress={() => navigation.navigate('Coach', { index })}
          />
        </View>
      ))}
    </Screen>
  );
}
export function CoachScreen({
  navigation,
  route,
}: NativeStackScreenProps<FeatureStack, 'Coach'>) {
  const [index, setIndex] = useState(route.params.index);
  const coach = coaches[index];
  const layout = useLayout();
  return (
    <Screen motionKey={index}>
      <Heading
        title={coach.name}
        eyebrow={coach.level}
        back={() => navigation.goBack()}
      />
      <Image
        source={coach.image}
        style={[
          s.image,
          { height: Math.min(300, layout.width - 2 * layout.padding) },
        ]}
      />
      <View style={s.row}>
        <Button
          outline
          title={layout.compact ? '← Prev' : '← Previous'}
          onPress={() => setIndex((index + 7) % 8)}
        />
        <Text style={s.body}>{index + 1} / 8</Text>
        <Button
          outline
          title="Next →"
          onPress={() => setIndex((index + 1) % 8)}
        />
      </View>
      <Text style={s.label}>{coach.years} years of experience</Text>
      <Text style={s.body}>{coach.specialty}</Text>
      <Text style={s.body}>{coach.description}</Text>
      <View style={s.card}>
        <Text style={s.text}>Practice Match — ${coach.price}</Text>
        <Text style={s.text}>Personal Training — ${coach.price + 10}</Text>
      </View>
      <Button
        title="Book a session"
        onPress={() =>
          navigation.navigate('Book', { kind: 'coach', id: coach.id })
        }
      />
    </Screen>
  );
}
