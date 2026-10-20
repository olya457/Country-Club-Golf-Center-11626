import React from 'react';
import { Alert, Text, View } from 'react-native';
import { Reservation } from '../state/types';
import { useApp } from '../state/AppContext';
import { styles as s, colors } from '../theme';
import { Button, Detail } from './ui';
import { dateLabel, money } from '../utils/booking';
export function ReservationCard({
  reservation: r,
  cancellable = false,
}: {
  reservation: Reservation;
  cancellable?: boolean;
}) {
  const { update } = useApp();
  return (
    <View
      style={[
        s.card,
        {
          borderWidth: 1,
          borderColor: r.cancelled ? colors.line : colors.gold,
        },
      ]}
    >
      <Text style={s.label}>
        {r.cancelled ? 'Cancelled' : '✓ Saved reservation'}
      </Text>
      <Text style={s.subtitle}>{r.name}</Text>
      {r.session && <Detail label="Session" value={r.session} />}
      <Detail label="Date" value={dateLabel(r.date)} />
      <Detail label="Time" value={r.time} />
      {r.kind === 'course' && (
        <>
          <Detail
            label="Course fee"
            value={money(r.price - (r.cart ? 40 : 0))}
          />
          <Detail label="Golf cart" value={r.cart ? '$40' : 'Not included'} />
        </>
      )}
      <View style={s.line} />
      <Detail label="Total" value={money(r.price)} highlight />
      <Text style={s.body}>
        Saved on this device. Contact the club to confirm availability.
      </Text>
      {cancellable && !r.cancelled && (
        <Button
          outline
          title="Cancel reservation"
          onPress={() =>
            Alert.alert(
              'Cancel reservation?',
              'This will remove your locally reserved time.',
              [
                { text: 'Keep', style: 'cancel' },
                {
                  text: 'Cancel reservation',
                  style: 'destructive',
                  onPress: () => {
                    void update(state => ({
                      ...state,
                      reservations: state.reservations.map(item =>
                        item.id === r.id ? { ...item, cancelled: true } : item,
                      ),
                    })).catch(() =>
                      Alert.alert('Could not save', 'Please try again.'),
                    );
                  },
                },
              ],
            )
          }
        />
      )}
    </View>
  );
}
