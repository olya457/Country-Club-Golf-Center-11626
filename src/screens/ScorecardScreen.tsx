import { useLayout } from '../hooks/useLayout';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FeatureStack } from '../navigation/types';
import { courses } from '../data/catalog';
import { useApp } from '../state/AppContext';
import {
  Button,
  Choice,
  Empty,
  Field,
  Heading,
  Screen,
} from '../components/ui';
import { Player, Round } from '../state/types';
import { makeId } from '../utils/booking';
import { holesScored, rankedPlayers, totalStrokes } from '../utils/scoring';
import { colors, styles as s } from '../theme';
export function ScorecardScreen({
  navigation,
}: NativeStackScreenProps<FeatureStack, 'List'>) {
  const { state, update } = useApp();
  const [courseId, setCourseId] = useState('');
  const [name, setName] = useState('');
  const [players, setPlayers] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState('');
  const add = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Enter a player name.');
      return;
    }
    if (
      players.some(
        player => player.name.toLowerCase() === trimmed.toLowerCase(),
      )
    ) {
      setError('Use a unique name for each player.');
      return;
    }
    if (players.length >= 4) {
      setError('A round supports up to four players.');
      return;
    }
    setPlayers([...players, { id: makeId(), name: trimmed }]);
    setName('');
    setError('');
  };
  const start = async () => {
    const course = courses.find(item => item.id === courseId);
    if (!course || !players.length) {
      throw new Error('Choose a course and add at least one player.');
    }
    const round: Round = {
      id: makeId(),
      courseId,
      players: players.map(player => ({
        ...player,
        scores: Array(course.holes).fill(null),
      })),
      hole: 0,
      finished: false,
      createdAt: new Date().toISOString(),
    };
    await update(previous => ({
      ...previous,
      rounds: [round, ...previous.rounds],
    }));
    setPlayers([]);
    setCourseId('');
    navigation.navigate('Round', { id: round.id });
  };
  return (
    <Screen>
      <Heading title="New Round" eyebrow="Scorecard" />
      {state.rounds
        .filter(round => !round.finished)
        .map(round => (
          <View key={round.id} style={s.card}>
            <Text style={s.subtitle}>
              {courses.find(course => course.id === round.courseId)?.name}
            </Text>
            <Text style={s.body}>
              {round.players.map(player => player.name).join(' · ')}
            </Text>
            <Button
              title="Resume round"
              onPress={() => navigation.navigate('Round', { id: round.id })}
            />
          </View>
        ))}
      <Text style={s.label}>Course</Text>
      <View style={s.wrap}>
        {courses.map(course => (
          <View key={course.id} style={{ width: '48%', flexGrow: 1 }}>
            <Choice
              label={`${course.name}\n${course.holes} holes`}
              selected={courseId === course.id}
              onPress={() => setCourseId(course.id)}
            />
          </View>
        ))}
      </View>
      <Text style={s.label}>Players ({players.length}/4)</Text>
      <Field
        label="Player name"
        value={name}
        onChangeText={setName}
        maxLength={40}
        onSubmitEditing={add}
        returnKeyType="done"
      />
      <Button
        title="+ Add player"
        disabled={players.length >= 4}
        onPress={add}
      />
      {error && <Text style={s.error}>{error}</Text>}
      {players.length === 0 && (
        <Text style={s.body}>No players yet. Add the names of your group.</Text>
      )}
      {players.map(player => (
        <View style={[s.card, s.row]} key={player.id}>
          <Text style={[s.text, { flex: 1 }]}>{player.name}</Text>
          <Button
            outline
            title="Remove"
            onPress={() =>
              setPlayers(players.filter(item => item.id !== player.id))
            }
          />
        </View>
      ))}
      <Button
        title="Start round"
        disabled={!courseId || !players.length}
        onPress={start}
      />
      {state.rounds.some(round => round.finished) && (
        <Text style={s.label}>Completed rounds</Text>
      )}
      {state.rounds
        .filter(round => round.finished)
        .map(round => (
          <View style={s.card} key={round.id}>
            <Text style={s.subtitle}>
              {courses.find(course => course.id === round.courseId)?.name}
            </Text>
            <Text style={s.body}>
              {new Date(round.createdAt).toLocaleDateString()} ·{' '}
              {round.players.map(player => player.name).join(', ')}
            </Text>
            <Button
              outline
              title="View results"
              onPress={() => navigation.navigate('Round', { id: round.id })}
            />
          </View>
        ))}
    </Screen>
  );
}
function Leaderboard({
  players,
  final = false,
}: {
  players: Player[];
  final?: boolean;
}) {
  const ranked = rankedPlayers(players);
  const max = Math.max(1, ...players.map(totalStrokes));
  return (
    <View style={s.card}>
      {ranked.map((player, index) => (
        <View key={player.id} style={{ gap: 8, paddingVertical: 8 }}>
          <View style={s.row}>
            <Text style={[s.text, { flex: 1 }]}>
              <Text style={s.gold}>{index + 1} </Text>
              {player.name}
            </Text>
            <Text style={s.subtitle}>
              {holesScored(player) ? totalStrokes(player) : '—'}
            </Text>
          </View>
          <View
            style={{ height: 6, borderRadius: 2, backgroundColor: colors.line }}
          >
            <View
              style={{
                height: 6,
                borderRadius: 2,
                width: `${(totalStrokes(player) / max) * 100}%`,
                backgroundColor: index === 0 ? colors.gold : colors.muted,
              }}
            />
          </View>
          <Text style={s.body}>
            {holesScored(player)} / {player.scores.length} holes scored
            {final ? ' · strokes' : ''}
          </Text>
        </View>
      ))}
    </View>
  );
}
export function RoundScreen({
  route,
  navigation,
}: NativeStackScreenProps<FeatureStack, 'Round'>) {
  const { state, update } = useApp();
  const layout = useLayout();
  const round = state.rounds.find(item => item.id === route.params.id);
  if (!round) {
    return (
      <Screen>
        <Heading title="Round unavailable" back={() => navigation.goBack()} />
        <Empty text="This round could not be found." />
      </Screen>
    );
  }
  const course = courses.find(item => item.id === round.courseId)!;
  const change = (transform: (previous: Round) => Round) =>
    update(previous => ({
      ...previous,
      rounds: previous.rounds.map(item =>
        item.id === round.id ? transform(item) : item,
      ),
    }));
  const score = (id: string, delta: number) =>
    change(previous => ({
      ...previous,
      players: previous.players.map(player =>
        player.id === id
          ? {
              ...player,
              scores: player.scores.map((value, index) =>
                index === previous.hole
                  ? Math.max(1, Math.min(99, (value ?? 0) + delta))
                  : value,
              ),
            }
          : player,
      ),
    }));
  const finish = async () => {
    await change(previous => ({ ...previous, finished: true }));
  };
  const askFinish = () => {
    const missing = round.players.some(player =>
      player.scores.some(value => value === null),
    );
    if (missing) {
      Alert.alert(
        'Finish an incomplete round?',
        'Unplayed holes remain blank. Players are ordered by holes completed, then by the lowest stroke total.',
        [
          { text: 'Continue playing', style: 'cancel' },
          {
            text: 'Finish round',
            onPress: () => {
              void finish().catch(() =>
                Alert.alert('Could not save', 'Please try again.'),
              );
            },
          },
        ],
      );
    } else {
      return finish();
    }
  };
  return (
    <Screen motionKey={`${round.finished}-${round.hole}`}>
      <Heading
        title={round.finished ? 'Final Results' : course.name}
        eyebrow={round.finished ? course.name : 'Round in progress'}
        back={() => navigation.goBack()}
      />
      {!round.finished && (
        <>
          <View style={s.row}>
            <Button
              outline
              title="‹"
              disabled={round.hole === 0}
              onPress={() =>
                change(previous => ({
                  ...previous,
                  hole: Math.max(0, previous.hole - 1),
                }))
              }
            />
            <View style={{ alignItems: 'center' }}>
              <Text style={s.title}>Hole {round.hole + 1}</Text>
              <Text style={s.body}>OF {course.holes}</Text>
            </View>
            <Button
              outline
              title="›"
              disabled={round.hole === course.holes - 1}
              onPress={() =>
                change(previous => ({
                  ...previous,
                  hole: Math.min(course.holes - 1, previous.hole + 1),
                }))
              }
            />
          </View>
          {round.players.map(player => (
            <View style={s.card} key={player.id}>
              <View style={[s.row, { flexWrap: 'wrap' }]}>
                <View style={layout.compact ? { width: '100%' } : { flex: 1 }}>
                  <Text style={s.text}>{player.name}</Text>
                  <Text style={s.body}>Total {totalStrokes(player)}</Text>
                </View>
                <Button
                  outline
                  title="−"
                  disabled={(player.scores[round.hole] ?? 0) <= 1}
                  onPress={() => score(player.id, -1)}
                />
                <Text style={s.title}>{player.scores[round.hole] ?? '–'}</Text>
                <Button
                  title="+"
                  disabled={(player.scores[round.hole] ?? 0) >= 99}
                  onPress={() => score(player.id, 1)}
                />
              </View>
              {player.scores[round.hole] !== null && (
                <Button
                  outline
                  title="Clear this hole"
                  onPress={() =>
                    change(previous => ({
                      ...previous,
                      players: previous.players.map(item =>
                        item.id === player.id
                          ? {
                              ...item,
                              scores: item.scores.map((value, index) =>
                                index === previous.hole ? null : value,
                              ),
                            }
                          : item,
                      ),
                    }))
                  }
                />
              )}
            </View>
          ))}
        </>
      )}
      <Text style={s.label}>
        {round.finished ? 'Rankings & stroke comparison' : 'Live leaderboard'}
      </Text>
      <Leaderboard players={round.players} final={round.finished} />
      <Text style={s.body}>
        Fewer strokes ranks higher when players have completed the same number
        of holes.
      </Text>
      {!round.finished ? (
        <Button
          title="Finish round"
          disabled={!round.players.some(player => holesScored(player) > 0)}
          onPress={askFinish}
        />
      ) : (
        <>
          <Text style={s.label}>Hole by hole</Text>
          <ScrollView horizontal>
            <View style={s.card}>
              <View style={s.row}>
                <Text style={[s.body, { width: 55 }]}>HOLE</Text>
                {round.players.map(player => (
                  <Text
                    key={player.id}
                    style={[s.text, { width: 90, textAlign: 'center' }]}
                  >
                    {player.name}
                  </Text>
                ))}
              </View>
              {Array.from({ length: course.holes }, (_, index) => (
                <View
                  key={index}
                  style={[
                    s.row,
                    {
                      borderTopWidth: 1,
                      borderTopColor: colors.line,
                      paddingTop: 12,
                    },
                  ]}
                >
                  <Text style={[s.body, { width: 55 }]}>{index + 1}</Text>
                  {round.players.map(player => (
                    <Text
                      key={player.id}
                      style={[s.text, { width: 90, textAlign: 'center' }]}
                    >
                      {player.scores[index] ?? '—'}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
          <Button title="New round" onPress={() => navigation.popToTop()} />
          <Button
            outline
            title="Continue editing scores"
            onPress={() =>
              change(previous => ({ ...previous, finished: false }))
            }
          />
        </>
      )}
    </Screen>
  );
}
