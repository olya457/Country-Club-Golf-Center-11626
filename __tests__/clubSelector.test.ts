import { recommendClub, Conditions } from '../src/utils/clubSelector';
import { clubs } from '../src/data/catalog';
const select = (
  distance: number,
  strength: Conditions['strength'] = 'Light',
  direction: Conditions['direction'] = 'Headwind',
  surface: Conditions['surface'] = 'Grass',
) => recommendClub({ distance, strength, direction, surface });
test.each([
  [135, 'Light', 'Headwind', 'Grass', '7-Iron', 135],
  [135, 'Moderate', 'Headwind', 'Grass', '6-Iron', 149],
  [135, 'Strong', 'Tailwind', 'Grass', '8-Iron', 115],
  [175, 'Light', 'Headwind', 'Dirt', '4-Hybrid', 175],
  [15, 'Light', 'Headwind', 'Sand', 'Lob Wedge', 15],
  [80, 'Moderate', 'Headwind', 'Sand', 'Sand Wedge', 88],
  [235, 'Light', 'Headwind', 'Grass', '5-Wood', 235],
  [280, 'Light', 'Headwind', 'Dirt', '3-Wood', 280],
] as const)(
  'recommends for %s %s %s %s',
  (distance, strength, direction, surface, club, adjusted) => {
    const result = select(distance, strength, direction, surface);
    expect(result.club.name).toBe(club);
    expect(result.adjusted).toBe(adjusted);
  },
);
test('all sixteen clubs can be selected at their distance boundaries', () => {
  clubs.forEach((club, index) => {
    const distance = index === 15 ? 266 : club.max;
    expect(select(distance).club.name).toBe(club.name);
    if (index < 15) {
      expect(select(distance + 1).club.name).toBe(clubs[index + 1].name);
    }
  });
});
test('crosswind preserves distance and explains lateral movement', () => {
  const result = select(140, 'Strong', 'Crosswind');
  expect(result.adjusted).toBe(140);
  expect(result.explanation).toContain('sideways');
});
test('light wind ignores direction', () => {
  expect(select(140, 'Light', 'Tailwind').adjusted).toBe(140);
});
test('sand uses adjusted distance before applying the recovery rule', () => {
  expect(select(19, 'Strong', 'Headwind', 'Sand').club.name).toBe('Sand Wedge');
  expect(select(200, 'Light', 'Headwind', 'Sand').explanation).toContain(
    'recovery',
  );
});
test.each([0, 4, 301, NaN, Infinity])('rejects invalid distance %s', value =>
  expect(() => select(value)).toThrow(),
);
