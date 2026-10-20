import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FeatureStack } from '../navigation/types';
import { courses } from '../data/catalog';
import { useApp } from '../state/AppContext';
import { Button, Heading, Screen } from '../components/ui';
import { Icon } from '../components/Icon';
import { ReservationCard } from '../components/ReservationCard';
import { styles as s } from '../theme';
export function CoursesScreen({
  navigation,
}: NativeStackScreenProps<FeatureStack, 'List'>) {
  const { state, update } = useApp();
  const sorted = [...courses].sort(
    (a, b) =>
      Number(state.favorites.includes(b.id)) -
      Number(state.favorites.includes(a.id)),
  );
  return (
    <Screen>
      <Heading title="Courses" eyebrow="Eight layouts" />
      {state.reservations
        .filter(r => r.kind === 'course' && !r.cancelled)
        .map(r => (
          <ReservationCard key={r.id} reservation={r} cancellable />
        ))}
      {sorted.map(course => (
        <View key={course.id} style={s.card}>
          <Image source={course.image} style={[s.image, { height: 170 }]} />
          <View style={s.row}>
            <Text style={[s.subtitle, { flex: 1 }]}>{course.name}</Text>
            <Button
              outline
              title={state.favorites.includes(course.id) ? '♥' : '♡'}
              onPress={() =>
                update(previous => ({
                  ...previous,
                  favorites: previous.favorites.includes(course.id)
                    ? previous.favorites.filter(id => id !== course.id)
                    : [...previous.favorites, course.id],
                }))
              }
            />
          </View>
          <Text style={s.label}>{course.level}</Text>
          <Text style={s.body}>
            {course.holes} holes · Par {course.par} ·{' '}
            {course.yards.toLocaleString()} yards{'\n'}${course.price} / player
          </Text>
          <Button
            title="Open course"
            onPress={() => navigation.navigate('Course', { id: course.id })}
          />
        </View>
      ))}
    </Screen>
  );
}
export function CourseScreen({
  navigation,
  route,
}: NativeStackScreenProps<FeatureStack, 'Course'>) {
  const course = courses.find(item => item.id === route.params.id)!;
  return (
    <Screen>
      <Heading
        title={course.name}
        eyebrow={course.level}
        back={() => navigation.goBack()}
      />
      <Image source={course.image} style={s.image} />
      <View style={s.row}>
        <Text style={s.body}>
          {course.holes} holes · Par {course.par}
        </Text>
        <Text style={[s.subtitle, s.gold]}>${course.price}</Text>
      </View>
      <Text style={s.body}>
        {course.yards.toLocaleString()} yards · Per player
      </Text>
      <View style={s.line} />
      <Text style={s.body}>{course.description}</Text>
      <View style={s.row}>
        <Text style={s.label}>Course plan</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Expand course plan"
          style={{ padding: 12 }}
          onPress={() => navigation.navigate('Plan', { id: course.id })}
        >
          <Icon name="scan" />
        </Pressable>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open course plan"
        onPress={() => navigation.navigate('Plan', { id: course.id })}
      >
        <Image source={course.map} style={[s.image, { height: 300 }]} />
      </Pressable>
      <Button
        title="Book course"
        onPress={() =>
          navigation.navigate('Book', { kind: 'course', id: course.id })
        }
      />
    </Screen>
  );
}
export function PlanScreen({
  navigation,
  route,
}: NativeStackScreenProps<FeatureStack, 'Plan'>) {
  const [zoom, setZoom] = useState(1);
  const { width } = useWindowDimensions();
  const size = Math.min(width - 40, 640);
  const course = courses.find(item => item.id === route.params.id)!;
  return (
    <Screen>
      <Heading
        title="Course Plan"
        eyebrow={course.name}
        back={() => navigation.goBack()}
      />
      <ScrollView horizontal nestedScrollEnabled style={{ height: size }}>
        <ScrollView
          nestedScrollEnabled
          style={{ width: size * zoom, height: size }}
        >
          <Image
            source={course.map}
            style={{ width: size * zoom, height: size * zoom }}
            resizeMode="contain"
          />
        </ScrollView>
      </ScrollView>
      <View style={s.row}>
        <Text style={s.body}>Zoom {Math.round(zoom * 100)}%</Text>
        <Button
          outline
          title="−"
          disabled={zoom <= 1}
          onPress={() => setZoom(Math.max(1, zoom - 0.5))}
        />
        <Button
          outline
          title="+"
          disabled={zoom >= 4}
          onPress={() => setZoom(Math.min(4, zoom + 0.5))}
        />
      </View>
      <Text style={s.body}>
        Drag to explore. Pale areas indicate sand bunkers; blue areas indicate
        water.
      </Text>
    </Screen>
  );
}
