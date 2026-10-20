import { parseMember, validDate } from '../src/utils/membership';
import { holesScored, rankedPlayers, totalStrokes } from '../src/utils/scoring';
import { dateKey, slotIsPast } from '../src/utils/booking';
const player = { id: 'a', name: 'Player A', scores: [4, null, 5] };
test('score totals never count blank holes', () => {
  expect(totalStrokes(player)).toBe(9);
  expect(holesScored(player)).toBe(2);
});
test('equal completion ranks fewer strokes first; unplayed players do not win', () => {
  const players = [
    player,
    { id: 'b', name: 'Player B', scores: [3, null, 4] },
    { id: 'c', name: 'Player C', scores: [null, null, null] },
  ];
  expect(rankedPlayers(players).map(item => item.id)).toEqual(['b', 'a', 'c']);
});
test('membership parser preserves user data and rejects code-only tickets', () => {
  const member = {
    firstName: 'Anna',
    lastName: 'Golfer',
    number: 'MEMBER-1',
    validUntil: '2028-02-29',
  };
  expect(parseMember(JSON.stringify(member)).firstName).toBe('Anna');
  expect(() => parseMember('MEMBER-1')).toThrow();
  expect(() => parseMember('{}')).toThrow();
});
test('expiry dates are real calendar dates', () => {
  expect(validDate('2026-02-30')).toBe(false);
  expect(validDate('2028-02-29')).toBe(true);
  expect(validDate('2026-13-01')).toBe(false);
});
test('booking slots reject past times and preserve local calendar day', () => {
  const now = new Date(2026, 9, 20, 10);
  expect(dateKey(now)).toBe('2026-10-20');
  expect(slotIsPast('2026-10-20', '09:30', now)).toBe(true);
  expect(slotIsPast('2026-10-20', '11:00', now)).toBe(false);
});
