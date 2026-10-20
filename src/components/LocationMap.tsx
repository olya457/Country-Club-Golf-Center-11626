import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Location } from '../state/types';
import { colors, styles as s } from '../theme';
import { Icon } from './Icon';
export function LocationMap({
  location,
  onOpen,
}: {
  location: Location | null;
  onOpen: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const bbox = location
    ? [
        Math.max(-180, location.longitude - 0.012),
        Math.max(-85, location.latitude - 0.008),
        Math.min(180, location.longitude + 0.012),
        Math.min(85, location.latitude + 0.008),
      ].join(',')
    : '';
  return (
    <View
      style={{
        height: 190,
        backgroundColor: colors.nav,
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      {location && !failed ? (
        <WebView
          key={bbox}
          source={{
            uri: `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
              bbox,
            )}&layer=mapnik&marker=${location.latitude}%2C${
              location.longitude
            }`,
          }}
          onError={() => setFailed(true)}
          onHttpError={() => setFailed(true)}
          scrollEnabled={false}
          style={{ backgroundColor: colors.nav }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            padding: 20,
          }}
        >
          <Icon name="pin" color={colors.gold} size={32} />
          <Text style={[s.body, { textAlign: 'center' }]}>
            {location
              ? 'Open the club location in Maps'
              : 'Add the club location to show the map'}
          </Text>
        </View>
      )}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open club location in maps"
        onPress={onOpen}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </View>
  );
}
