import React, { useState } from 'react';
import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, Heading, Screen } from '../components/ui';
import { Icon } from '../components/Icon';
import {
  clubGuide,
  courseGuide,
  LearningResource,
  resources,
  rules,
} from '../data/learn';
import { useLayout } from '../hooks/useLayout';
import { colors, styles as s } from '../theme';

const sections = ['Rules', 'Course', 'Clubs', 'Articles', 'Videos'] as const;
type Section = (typeof sections)[number];

export async function openLearningResource(url: string) {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert(
      'Unable to open link',
      'Please check your connection and try again.',
    );
  }
}

function ResourceCard({ resource }: { resource: LearningResource }) {
  return (
    <View style={s.card}>
      <Text style={s.label}>
        {resource.kind} · {resource.publisher}
      </Text>
      <Text style={s.subtitle}>{resource.title}</Text>
      <Text style={s.body}>{resource.description}</Text>
      <Button
        outline
        title={
          resource.kind === 'Video' ? 'Watch on website ↗' : 'Read on website ↗'
        }
        onPress={() => openLearningResource(resource.url)}
      />
    </View>
  );
}

export function LearnScreen() {
  const [section, setSection] = useState<Section>('Rules');
  const layout = useLayout();
  const entries =
    section === 'Rules'
      ? rules
      : section === 'Course'
      ? courseGuide
      : clubGuide;
  return (
    <Screen motionKey={section}>
      <Heading
        title="Learn Golf"
        eyebrow="A little knowledge. A better round."
      />
      <Text style={s.body}>
        Your first steps, from the tee to the final putt. Explore the basics,
        meet your clubs and learn from expert videos.
      </Text>
      <View style={local.tabs} accessibilityRole="tablist">
        {sections.map(item => (
          <Pressable
            key={item}
            accessibilityRole="tab"
            accessibilityLabel={item}
            accessibilityState={{ selected: section === item }}
            onPress={() => setSection(item)}
            style={[local.tab, section === item && local.selected]}
          >
            <Text
              style={[
                local.tabText,
                section === item && { color: colors.background },
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
      {section === 'Articles' || section === 'Videos' ? (
        <>
          <Text style={s.subtitle}>
            {section === 'Videos' ? 'Watch & practise' : 'Read & explore'}
          </Text>
          <Text style={s.body}>
            Links open outside this app. An internet connection is required;
            publisher access requirements may apply.
          </Text>
          {resources
            .filter(
              item =>
                item.kind === (section === 'Videos' ? 'Video' : 'Article'),
            )
            .map(resource => (
              <ResourceCard key={resource.url} resource={resource} />
            ))}
        </>
      ) : (
        <>
          <View style={s.card}>
            <Icon
              name={
                section === 'Course'
                  ? 'flag'
                  : section === 'Clubs'
                  ? 'club'
                  : 'book'
              }
              color={colors.gold}
              size={32}
            />
            <Text style={s.subtitle}>
              {section === 'Rules'
                ? 'The essentials of play'
                : section === 'Course'
                ? 'A quick walk around the course'
                : 'Get to know your clubs'}
            </Text>
            <Text style={s.body}>
              {section === 'Rules'
                ? 'A beginner’s summary. Check the official Rules and the course’s Local Rules for the full procedure in any situation.'
                : section === 'Course'
                ? 'Tee → fairway → approach → green. A hole may be a par 3, 4 or 5; par is the reference score. One under is a birdie, one over is a bogey.'
                : 'Carry up to 14 clubs, but a smaller set is fine to start. Learn your own carry distances at the range; there is no universal distance for each club.'}
            </Text>
          </View>
          <View style={local.grid}>
            {entries.map(([title, body], index) => (
              <View
                key={title}
                style={[s.card, { width: layout.wide ? '48%' : '100%' }]}
              >
                <Text style={s.label}>
                  {String(index + 1).padStart(2, '0')}
                </Text>
                <Text style={s.subtitle}>{title}</Text>
                <Text style={s.body}>{body}</Text>
              </View>
            ))}
          </View>
          <Button
            title={
              section === 'Clubs'
                ? 'Watch lessons by club type'
                : 'Watch rules & course videos'
            }
            onPress={() => setSection('Videos')}
          />
          <Button
            outline
            title="Explore articles & official rules"
            onPress={() => setSection('Articles')}
          />
        </>
      )}
    </Screen>
  );
}

const local = StyleSheet.create({
  tabs: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tab: {
    minHeight: 44,
    minWidth: 76,
    flexGrow: 1,
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.line,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: { backgroundColor: colors.gold, borderColor: colors.gold },
  tabText: { color: colors.text, fontSize: 13, fontWeight: '600' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 14,
  },
});
