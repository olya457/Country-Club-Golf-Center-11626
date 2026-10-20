import { SelectField } from '../components/SelectField';
import React, { useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FeatureStack } from '../navigation/types';
import { coaches, courses } from '../data/catalog';
import { useApp } from '../state/AppContext';
import { Button, Choice, Detail, Heading, Screen } from '../components/ui';
import { ReservationCard } from '../components/ReservationCard';
import { colors, styles as s } from '../theme';
import {
  dateKey,
  dateLabel,
  makeId,
  slotIsPast,
  timeSlots,
  upcomingDates,
} from '../utils/booking';
export function BookingScreen({
  navigation,
  route,
}: NativeStackScreenProps<FeatureStack, 'Book'>) {
  const { kind, id } = route.params;
  const item = (kind === 'course' ? courses : coaches).find(
    entry => entry.id === id,
  )!;
  const { state, update } = useApp();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [cart, setCart] = useState(false);
  const [session, setSession] = useState('');
  const price =
    item.price +
    (kind === 'course' && cart ? 40 : 0) +
    (session === 'Personal Training' ? 10 : 0);
  const unavailable = (slot: string) =>
    slotIsPast(date, slot) ||
    state.reservations.some(
      r =>
        !r.cancelled &&
        r.kind === kind &&
        r.resourceId === id &&
        r.date === date &&
        r.time === slot,
    );
  const confirm = async () => {
    const reservation = {
      id: makeId(),
      kind,
      resourceId: id,
      name: item.name,
      date,
      time,
      cart: kind === 'course' && cart,
      session: session || undefined,
      price,
    };
    await update(previous => {
      if (
        !date ||
        !time ||
        (kind === 'coach' && !session) ||
        slotIsPast(date, time)
      ) {
        throw new Error('Choose a session, future date and available time.');
      }
      if (
        previous.reservations.some(
          r =>
            !r.cancelled &&
            r.kind === kind &&
            r.resourceId === id &&
            r.date === date &&
            r.time === time,
        )
      ) {
        throw new Error('This time is already reserved. Choose another time.');
      }
      return {
        ...previous,
        reservations: [reservation, ...previous.reservations],
      };
    });
    navigation.replace('Confirmation', { id: reservation.id });
  };
  return (
    <Screen>
      <Heading
        title={kind === 'course' ? 'Book Course' : 'Book Session'}
        eyebrow={item.name}
        back={() => navigation.goBack()}
      />
      {kind === 'coach' && (
        <>
          <Text style={s.label}>Session type</Text>
          {['Practice Match', 'Personal Training'].map((name, index) => (
            <Choice
              key={name}
              label={`${name} — $${item.price + index * 10}`}
              selected={session === name}
              onPress={() => setSession(name)}
            />
          ))}
        </>
      )}
      <SelectField
        label="Select date"
        value={date}
        placeholder="Choose a date"
        options={upcomingDates().map(day => ({
          value: dateKey(day),
          label: dateLabel(dateKey(day)),
        }))}
        onChange={value => {
          setDate(value);
          setTime('');
        }}
      />
      <SelectField
        label="Select time"
        value={time}
        placeholder={date ? 'Choose a time' : 'Choose a date first'}
        disabled={!date}
        options={timeSlots.map(slot => ({
          value: slot,
          label: unavailable(slot) ? `${slot} · Unavailable` : slot,
          disabled: unavailable(slot),
        }))}
        onChange={setTime}
      />
      {kind === 'course' && (
        <View style={[s.row, s.input]}>
          <Text style={[s.text, { flex: 1 }]}>Add Golf Cart — $40</Text>
          <Switch
            accessibilityLabel="Add golf cart for 40 dollars"
            value={cart}
            onValueChange={setCart}
            trackColor={{ true: colors.gold, false: colors.line }}
            thumbColor={colors.text}
          />
        </View>
      )}
      <Text style={s.label}>Review</Text>
      <View style={s.card}>
        <Detail
          label={kind === 'course' ? 'Course' : 'Coach'}
          value={item.name}
        />
        {kind === 'coach' && (
          <Detail label="Session" value={session || 'Not selected'} />
        )}
        <Detail label="Date" value={date ? dateLabel(date) : 'Not selected'} />
        <Detail label="Time" value={time || 'Not selected'} />
        <Detail label="Base price" value={`$${item.price}`} />
        {cart && <Detail label="Golf cart" value="$40" />}
        {session === 'Personal Training' && (
          <Detail label="Personal training" value="+$10" />
        )}
        <View style={s.line} />
        <Detail label="Total" value={`$${price}`} highlight />
      </View>
      <Text style={s.body}>
        Times reflect reservations on this device. Final availability is
        confirmed by the club.
      </Text>
      <Button
        title="Confirm reservation"
        disabled={!date || !time || (kind === 'coach' && !session)}
        onPress={confirm}
      />
    </Screen>
  );
}
export function ConfirmationScreen({
  route,
  navigation,
}: NativeStackScreenProps<FeatureStack, 'Confirmation'>) {
  const { state } = useApp();
  const reservation = state.reservations.find(r => r.id === route.params.id);
  return (
    <Screen>
      <Heading title="Reservation Saved" eyebrow="Your booking" />
      {reservation && <ReservationCard reservation={reservation} />}
      <Button
        title={
          reservation?.kind === 'coach' ? 'Back to coaches' : 'Back to courses'
        }
        onPress={() => navigation.popToTop()}
      />
    </Screen>
  );
}
