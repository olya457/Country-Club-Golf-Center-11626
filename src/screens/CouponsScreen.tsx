import { DateSelectField } from '../components/DateSelectField';
import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FeatureStack } from '../navigation/types';
import { offers } from '../data/catalog';
import { useApp } from '../state/AppContext';
import { Button, Detail, Field, Heading, Screen } from '../components/ui';
import { Barcode } from '../components/Barcode';
import { validDate } from '../utils/membership';
import { dateKey } from '../utils/booking';
import { styles as s } from '../theme';

function CouponArtwork({ source }: { source: ImageSourcePropType }) {
  const { width, height } = Image.resolveAssetSource(source);
  return (
    <View style={[styles.artwork, { aspectRatio: width / height }]}>
      <Image
        source={source}
        resizeMode="contain"
        style={styles.image}
        accessibilityLabel="Club coupon"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  artwork: { width: '100%', alignSelf: 'center' },
  image: { width: '100%', height: '100%' },
});

export function CouponsScreen({
  navigation,
}: NativeStackScreenProps<FeatureStack, 'List'>) {
  const { state } = useApp();
  return (
    <Screen>
      <Heading title="Member Coupons" eyebrow="Your club privileges" />
      {offers.map(offer => (
        <View style={s.card} key={offer.id}>
          <CouponArtwork source={offer.image} />
          <Text style={s.subtitle}>{offer.name}</Text>
          <Text style={s.body}>{offer.description}</Text>
          <Text style={s.label}>
            {state.coupons.some(coupon => coupon.offerId === offer.id)
              ? 'Coupon saved'
              : 'Add your club-issued coupon'}
          </Text>
          <Button
            title="Open coupon"
            onPress={() => navigation.navigate('Coupon', { id: offer.id })}
          />
        </View>
      ))}
    </Screen>
  );
}
export function CouponScreen({
  route,
  navigation,
}: NativeStackScreenProps<FeatureStack, 'Coupon'>) {
  const { state, update } = useApp();
  const offer = offers.find(item => item.id === route.params.id)!;
  const coupon = state.coupons.find(item => item.offerId === offer.id);
  const [editing, setEditing] = useState(!coupon);
  const [code, setCode] = useState(coupon?.code || '');
  const [terms, setTerms] = useState(coupon?.terms || '');
  const [validUntil, setValidUntil] = useState(coupon?.validUntil || '');
  const save = async () => {
    if (!/^[\x20-\x7E]{1,80}$/.test(code.trim())) {
      throw new Error(
        'Enter the printed coupon code using 1–80 Latin characters, numbers or symbols.',
      );
    }
    if (!terms.trim() || !validDate(validUntil)) {
      throw new Error(
        'Enter the offer terms and a valid expiry date (YYYY-MM-DD).',
      );
    }
    await update(previous => ({
      ...previous,
      coupons: [
        ...previous.coupons.filter(item => item.offerId !== offer.id),
        {
          offerId: offer.id,
          code: code.trim(),
          terms: terms.trim(),
          validUntil,
        },
      ],
    }));
    setEditing(false);
  };
  const expired = coupon && coupon.validUntil < dateKey(new Date());
  return (
    <Screen>
      <Heading
        title={offer.name}
        eyebrow="Member offer"
        back={() => navigation.goBack()}
      />
      <CouponArtwork source={offer.image} />
      <Text style={s.body}>{offer.description}</Text>
      {editing ? (
        <>
          <Text style={s.body}>
            Enter the code, conditions and expiry printed on the coupon issued
            by your club.
          </Text>
          <Field
            label="Coupon code"
            value={code}
            onChangeText={setCode}
            autoCapitalize="characters"
            maxLength={80}
          />
          <Field
            label="Offer & conditions"
            value={terms}
            onChangeText={setTerms}
            multiline
            maxLength={1500}
          />
          <DateSelectField
            label="Valid until"
            value={validUntil}
            onChange={setValidUntil}
          />
          <Button title="Save coupon" onPress={save} />
          {coupon && (
            <Button outline title="Cancel" onPress={() => setEditing(false)} />
          )}
        </>
      ) : (
        coupon && (
          <>
            <View style={s.card}>
              <Text style={s.label}>Conditions</Text>
              <Text style={s.body}>{coupon.terms}</Text>
              <Detail
                label={expired ? 'Expired' : 'Valid until'}
                value={coupon.validUntil}
              />
            </View>
            {expired ? (
              <Text style={s.error}>This coupon has expired.</Text>
            ) : (
              <>
                <Barcode value={coupon.code} />
                <Text style={s.body}>
                  Show this barcode to a member of staff. Redemption is subject
                  to the club’s terms.
                </Text>
              </>
            )}
            <Button
              outline
              title="Edit coupon details"
              onPress={() => setEditing(true)}
            />
          </>
        )
      )}
    </Screen>
  );
}
