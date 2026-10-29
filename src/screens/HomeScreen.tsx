import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import { LocationMap } from '../components/LocationMap';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FeatureStack } from '../navigation/types';
import { artwork } from '../data/catalog';
import { useApp } from '../state/AppContext';
import { Button, Field, Heading, Screen } from '../components/ui';
import { Icon } from '../components/Icon';
import { MemberCard } from '../components/MemberCard';
import { colors, styles as s } from '../theme';
import { getWeather, Weather } from '../services/weather';
export function HomeScreen({
  navigation,
}: NativeStackScreenProps<FeatureStack, 'List'>) {
  const { state } = useApp();
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    setWeather(null);
    setError('');
    if (!state.location) {
      return;
    }
    const controller = new AbortController();
    let active = true;
    setLoading(true);
    const timer = setTimeout(() => controller.abort(), 12000);
    getWeather(state.location, controller.signal)
      .then(value => {
        if (active) {
          setWeather(value);
        }
      })
      .catch(() => {
        if (active) {
          setError(
            'Weather could not be loaded. Check your connection and try again.',
          );
        }
      })
      .finally(() => {
        clearTimeout(timer);
        if (active) {
          setLoading(false);
        }
      });
    return () => {
      active = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, [state.location, refresh]);
  const openMap = async () => {
    if (!state.location) {
      navigation.navigate('Settings');
      return;
    }
    const { latitude, longitude, address } = state.location;
    const coords = `${latitude},${longitude}`;
    const native =
      Platform.OS === 'ios'
        ? `maps:0,0?q=${encodeURIComponent(address)}&ll=${coords}`
        : `geo:${coords}?q=${coords}(${encodeURIComponent(address)})`;
    try {
      await Linking.openURL(native);
    } catch {
      await Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${coords}`,
      );
    }
  };
  return (
    <Screen>
      <View style={s.row}>
        <View style={{ gap: 6, flex: 1 }}>
          <Text style={[s.subtitle, { letterSpacing: 3 }]}>COUNTRY CLUB</Text>
          <Text style={[s.label, { letterSpacing: 4 }]}>GOLF CENTER</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Club location settings"
          onPress={() => navigation.navigate('Settings')}
          style={{ padding: 12 }}
        >
          <Icon name="settings" />
        </Pressable>
      </View>
      <Image
        source={artwork.hero}
        style={[s.image, { height: 240 }]}
        resizeMode="cover"
      />
      <Text style={s.title}>A complete golf complex</Text>
      <Text style={s.body}>
        Eight courses, a full driving range, expert coaching, and a welcoming
        clubhouse, all in one place. Reserve a tee time, sharpen your game, and
        keep every round on record.
      </Text>
      <View style={s.card}>
        <Text style={s.subtitle}>New to the game?</Text>
        <Text style={s.body}>
          Rules, a quick course guide, club basics and expert video lessons —
          all in one place.
        </Text>
        <Button
          title="Explore Learn Golf"
          onPress={() => navigation.getParent()?.navigate('Learn')}
        />
      </View>
      {state.member && <MemberCard member={state.member} />}
      <Button
        title={
          state.member
            ? 'Scan another membership ticket'
            : '⌗  Scan membership ticket'
        }
        onPress={() => navigation.navigate('Scan')}
      />
      <Text style={s.label}>Conditions today</Text>
      <View style={s.card}>
        {!state.location ? (
          <>
            <Text style={s.body}>
              Add the club location to see local playing conditions.
            </Text>
            <Button
              outline
              title="Set club location"
              onPress={() => navigation.navigate('Settings')}
            />
          </>
        ) : loading ? (
          <ActivityIndicator color={colors.gold} />
        ) : weather ? (
          <>
            <View style={s.row}>
              {[
                {
                  icon: 'rain' as const,
                  value: `${weather.precipitation} mm`,
                  label: 'Rain',
                },
                {
                  icon: 'wind' as const,
                  value: `${weather.speed}`,
                  label: 'Wind · km/h',
                },
                {
                  icon: 'pin' as const,
                  value: weather.direction,
                  label: 'Direction',
                },
              ].map(item => (
                <View key={item.label} style={{ flex: 1, gap: 8 }}>
                  <Icon name={item.icon} color={colors.gold} />
                  <Text style={s.subtitle}>{item.value}</Text>
                  <Text
                    style={[
                      s.body,
                      { fontSize: 10, textTransform: 'uppercase' },
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>
            <View style={s.line} />
            <Text style={s.body}>
              {weather.temperature}°C · Updated {weather.time.replace('T', ' ')}
            </Text>
          </>
        ) : (
          <Text style={s.error}>{error}</Text>
        )}
        {state.location && (
          <Button
            outline
            title="Refresh weather"
            onPress={() => setRefresh(value => value + 1)}
          />
        )}
        <Pressable
          onPress={() => {
            void Linking.openURL('https://open-meteo.com/').catch(() => {});
          }}
        >
          <Text style={[s.body, { fontSize: 11 }]}>Weather by Open-Meteo</Text>
        </Pressable>
      </View>
      <Text style={s.label}>Find us</Text>
      <LocationMap
        location={state.location}
        onOpen={() => {
          void openMap().catch(() => setError('Maps could not be opened.'));
        }}
      />
      <Text style={s.body}>
        {state.location
          ? state.location.address
          : 'Club location has not been set.'}
      </Text>
      {state.location && (
        <Text style={s.body}>
          {state.location.latitude}, {state.location.longitude} · Location
          preview
        </Text>
      )}
      <Button
        outline
        title={state.location ? 'Open in maps' : 'Add club location'}
        onPress={openMap}
      />
    </Screen>
  );
}
export function SettingsScreen({
  navigation,
}: NativeStackScreenProps<FeatureStack, 'Settings'>) {
  const { state, update } = useApp();
  const [address, setAddress] = useState(state.location?.address || '');
  const [latitude, setLatitude] = useState(
    state.location ? String(state.location.latitude) : '',
  );
  const [longitude, setLongitude] = useState(
    state.location ? String(state.location.longitude) : '',
  );
  const save = async () => {
    const lat = Number(latitude.trim().replace(',', '.'));
    const lon = Number(longitude.trim().replace(',', '.'));
    if (
      !address.trim() ||
      !latitude.trim() ||
      !longitude.trim() ||
      !Number.isFinite(lat) ||
      !Number.isFinite(lon) ||
      Math.abs(lat) > 90 ||
      Math.abs(lon) > 180
    ) {
      throw new Error(
        'Enter the club address and valid latitude (−90 to 90) and longitude (−180 to 180).',
      );
    }
    await update(previous => ({
      ...previous,
      location: { address: address.trim(), latitude: lat, longitude: lon },
    }));
    navigation.goBack();
  };
  return (
    <Screen>
      <Heading
        title="Club Location"
        eyebrow="Settings"
        back={() => navigation.goBack()}
      />
      <Text style={s.body}>
        Enter the actual club location for weather and directions.
      </Text>
      <Field
        label="Club address"
        value={address}
        onChangeText={setAddress}
        maxLength={250}
      />
      <Field
        label="Latitude"
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="numbers-and-punctuation"
        placeholder="−90 to 90"
      />
      <Field
        label="Longitude"
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="numbers-and-punctuation"
        placeholder="−180 to 180"
      />
      <Button title="Save location" onPress={save} />
    </Screen>
  );
}
