import { clubs } from '../data/catalog';
export type Strength = 'Light' | 'Moderate' | 'Strong';
export type Direction = 'Headwind' | 'Tailwind' | 'Crosswind';
export type Surface = 'Grass' | 'Sand' | 'Dirt';
export interface Conditions {
  distance: number;
  strength: Strength;
  direction: Direction;
  surface: Surface;
}
export function recommendClub({
  distance,
  strength,
  direction,
  surface,
}: Conditions) {
  if (!Number.isFinite(distance) || distance < 5 || distance > 300) {
    throw new Error('Enter a distance from 5 to 300 metres.');
  }
  let factor = 1;
  if (strength !== 'Light') {
    if (direction === 'Headwind') {
      factor = strength === 'Strong' ? 1.2 : 1.1;
    }
    if (direction === 'Tailwind') {
      factor = strength === 'Strong' ? 0.85 : 0.9;
    }
  }
  const adjusted = Math.round(distance * factor);
  const base = clubs.find(club => adjusted <= club.max)!;
  let name = base.name;
  if (surface === 'Sand') {
    name = adjusted <= 20 ? 'Lob Wedge' : 'Sand Wedge';
  }
  if (surface === 'Dirt') {
    if (name === 'Driver') {
      name = '3-Wood';
    }
    if (name === '4-Iron' || name === '5-Iron') {
      name = '4-Hybrid';
    }
  }
  let explanation = `Your target is ${distance} m away. ${
    strength === 'Light'
      ? 'Light wind leaves'
      : `${strength} ${direction.toLowerCase()} ${
          factor === 1 ? 'leaves' : factor > 1 ? 'increases' : 'reduces'
        }`
  } the estimated playing distance ${
    factor === 1 ? 'at' : 'to'
  } ${adjusted} m. `;
  explanation +=
    surface === 'Sand' && adjusted > 20
      ? 'Use the Sand Wedge for a recovery shot out of the bunker, then run the selector again from the grass.'
      : `${name} is the suggested option${
          base.name !== name
            ? ` instead of ${base.name} for a more controlled shot from dirt`
            : ' for this distance and lie'
        }.`;
  if (direction === 'Crosswind' && strength !== 'Light') {
    explanation += ' Allow for sideways ball movement in the crosswind.';
  }
  return {
    club: clubs.find(club => club.name === name)!,
    adjusted,
    explanation,
  };
}
