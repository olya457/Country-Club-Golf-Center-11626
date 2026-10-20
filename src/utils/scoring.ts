import { Player } from '../state/types';
export const totalStrokes = (player: Player) =>
  player.scores.reduce<number>((sum, value) => sum + (value ?? 0), 0);
export const holesScored = (player: Player) =>
  player.scores.filter(value => value !== null).length;
export const rankedPlayers = (players: Player[]) =>
  [...players].sort((a, b) => {
    const aCount = holesScored(a);
    const bCount = holesScored(b);
    if (aCount !== bCount) {
      return bCount - aCount;
    }
    return totalStrokes(a) - totalStrokes(b);
  });
