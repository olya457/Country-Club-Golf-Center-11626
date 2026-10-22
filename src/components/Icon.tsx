import React from 'react';
import { colors } from '../theme';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
export type IconName =
  | 'home'
  | 'flag'
  | 'coach'
  | 'score'
  | 'club'
  | 'coupon'
  | 'back'
  | 'heart'
  | 'scan'
  | 'wind'
  | 'rain'
  | 'pin'
  | 'settings';
export function Icon({
  name,
  color = colors.muted,
  size = 24,
  filled = false,
}: {
  name: IconName;
  color?: string;
  size?: number;
  filled?: boolean;
}) {
  const paths: Partial<Record<IconName, string>> = {
    home: 'M3 11 12 3l9 8M5 10v11h5v-7h4v7h5V10',
    flag: 'M6 22V2l14 5-14 6M3 22h9',
    coach: 'M3 21v-5c0-5 9-5 9 0v5M15 19l5-16M14 16l4 1',
    score: 'M9 7h6M9 11h6M9 15h3',
    club: 'M6 20h7L22 3M4 20l1 3h7l1-3',
    coupon: 'M3 7h18v4a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4V7M15 7v11',
    back: 'M19 12H5m6-6-6 6 6 6',
    heart: 'M12 21S2 15 2 8a5 5 0 0 1 10-2 5 5 0 0 1 10 2c0 7-10 13-10 13Z',
    scan: 'M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5M6 12h12',
    wind: 'M3 8h12c6 0 4-7 0-5M3 12h16c5 0 4 7 0 5M3 16h7c4 0 3 6 0 4',
    rain: 'M5 14C0 12 3 6 7 7c0-7 12-7 12 0 5 0 5 7 1 8M8 17l-2 4m7-4-2 4m7-4-2 4',
    pin: 'M12 22s8-9 8-14a8 8 0 0 0-16 0c0 5 8 14 8 14Z',
    settings: 'M12 2v4m0 12v4M2 12h4m12 0h4M5 5l3 3m8 8 3 3M5 19l3-3M16 8l3-3',
  };
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path
        d={paths[name]}
        fill={name === 'heart' && filled ? color : 'none'}
      />
      {name === 'coach' && <Circle cx={7.5} cy={6} r={3} />}
      {name === 'score' && <Rect x={5} y={2} width={14} height={20} rx={2} />}
      {name === 'pin' && <Circle cx={12} cy={8} r={2.5} />}
      {name === 'settings' && <Circle cx={12} cy={12} r={5} />}
    </Svg>
  );
}
