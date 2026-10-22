import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors, serif } from '../theme';

export function ClubEmblem({ size = 64 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" accessible={false}>
      <Circle
        cx="50"
        cy="50"
        r="47"
        fill={colors.nav}
        stroke={colors.gold}
        strokeWidth="1.5"
      />
      <Circle cx="50" cy="50" r="40" fill="none" stroke={colors.line} />
      <Path
        d="M25 67Q48 52 76 65M29 74Q51 62 71 72"
        fill="none"
        stroke={colors.gold}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M49 60V24L72 33 49 42"
        fill={colors.button}
        stroke={colors.gold}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Circle cx="39" cy="61" r="3" fill={colors.text} />
    </Svg>
  );
}

export function ClubLogo({ compact = false }: { compact?: boolean }) {
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel="Greenway Golf Club"
      style={{
        flexDirection: compact ? 'row' : 'column',
        alignItems: 'center',
        gap: compact ? 12 : 16,
      }}
    >
      {compact && <ClubEmblem size={48} />}
      <View
        style={{
          flexShrink: 1,
          alignItems: compact ? 'flex-start' : 'center',
          gap: 5,
        }}
      >
        <Text
          style={{
            fontFamily: serif,
            color: colors.text,
            fontSize: compact ? 25 : 36,
            letterSpacing: 1,
          }}
        >
          Greenway
        </Text>
        <Text style={{ color: colors.gold, fontSize: 10, letterSpacing: 4 }}>
          GOLF CLUB
        </Text>
      </View>
    </View>
  );
}
