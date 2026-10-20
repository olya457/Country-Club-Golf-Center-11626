import { DateSelectField } from '../components/DateSelectField';
import React, { useRef, useState } from 'react';
import { AppState as NativeAppState, Linking, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import { FeatureStack } from '../navigation/types';
import { useApp } from '../state/AppContext';
import { Button, Field, Heading, Screen } from '../components/ui';
import { MemberCard } from '../components/MemberCard';
import { parseMember } from '../utils/membership';
import { styles as s } from '../theme';
export function MembershipScreen({
  navigation,
}: NativeStackScreenProps<FeatureStack, 'Scan'>) {
  const { state, update } = useApp();
  const [member, setMember] = useState(state.member);
  const [scanning, setScanning] = useState(!state.member);
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [number, setNumber] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const locked = useRef(false);
  const [foreground, setForeground] = useState(
    NativeAppState.currentState === 'active',
  );
  React.useEffect(() => {
    const listener = NativeAppState.addEventListener('change', value =>
      setForeground(value === 'active'),
    );
    return () => listener.remove();
  }, []);
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const focused = useIsFocused();
  const save = async (raw: string) => {
    const next = parseMember(raw);
    await update(previous => ({ ...previous, member: next }));
    setMember(next);
    setScanning(false);
    setError('');
  };
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'code-128', 'pdf-417', 'aztec'],
    onCodeScanned: codes => {
      if (locked.current || !scanning || !codes[0]?.value) {
        return;
      }
      locked.current = true;
      void save(codes[0].value).catch(err => {
        setError(err.message);
        setScanning(false);
      });
    },
  });
  return (
    <Screen>
      <Heading
        title="Scan Ticket"
        eyebrow="Membership"
        back={() => navigation.goBack()}
      />
      {member && !scanning ? (
        <>
          <Text style={s.label}>✓ Ticket details saved</Text>
          <MemberCard member={member} />
          <Text style={s.body}>
            Membership details are stored on this device. Club staff verify
            eligibility.
          </Text>
          <Button
            outline
            title="Scan again"
            onPress={() => {
              locked.current = false;
              setScanning(true);
              setError('');
            }}
          />
          <Button title="Done" onPress={() => navigation.goBack()} />
        </>
      ) : (
        <>
          {hasPermission && device && scanning ? (
            <View style={{ height: 280, borderRadius: 6, overflow: 'hidden' }}>
              <Camera
                style={{ flex: 1 }}
                device={device}
                isActive={focused && foreground && scanning}
                codeScanner={codeScanner}
                onError={err => setError(err.message)}
              />
            </View>
          ) : (
            <>
              <Text style={s.body}>
                {device
                  ? 'Allow camera access to scan the code on your membership ticket.'
                  : 'A camera is not available. You can enter your ticket details below.'}
              </Text>
              {device && (
                <Button
                  title="Enable camera"
                  onPress={async () => {
                    const granted = await requestPermission();
                    if (!granted) {
                      await Linking.openSettings();
                    } else {
                      locked.current = false;
                      setScanning(true);
                    }
                  }}
                />
              )}
            </>
          )}
          {!!error && (
            <>
              <Text style={s.error}>{error}</Text>
              <Button
                outline
                title="Try scanner again"
                onPress={() => {
                  locked.current = false;
                  setScanning(true);
                  setError('');
                }}
              />
            </>
          )}
          <Text style={s.label}>Or enter ticket details</Text>
          <Field
            label="First name"
            value={firstName}
            onChangeText={setFirstName}
            autoComplete="given-name"
            maxLength={60}
          />
          <Field
            label="Last name"
            value={lastName}
            onChangeText={setLastName}
            autoComplete="family-name"
            maxLength={60}
          />
          <Field
            label="Member number"
            value={number}
            onChangeText={setNumber}
            maxLength={100}
          />
          <DateSelectField
            label="Valid until"
            value={validUntil}
            onChange={setValidUntil}
          />
          <Button
            title="Save ticket details"
            onPress={() =>
              save(
                JSON.stringify({
                  firstName,
                  lastName,
                  number,
                  validUntil,
                  tier: 'Member',
                }),
              )
            }
          />
        </>
      )}
    </Screen>
  );
}
