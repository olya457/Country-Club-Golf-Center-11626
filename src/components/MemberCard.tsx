import React from 'react';
import { Text, View } from 'react-native';
import { Member } from '../state/types';
import { colors, styles as s } from '../theme';
import { dateKey } from '../utils/booking';
export function MemberCard({ member }: { member: Member }) {
  return (
    <View
      style={[
        s.card,
        { borderWidth: 1, borderColor: colors.gold, padding: 20, gap: 22 },
      ]}
    >
      <View style={s.row}>
        <Text style={s.label}>Member</Text>
        <Text style={s.body}>{member.tier}</Text>
      </View>
      <Text style={s.title}>
        {member.firstName} {member.lastName}
      </Text>
      <View style={s.line} />
      <View style={s.row}>
        <View style={{ flex: 1, gap: 6 }}>
          <Text style={s.body}>MEMBER NO.</Text>
          <Text style={s.text}>{member.number}</Text>
        </View>
        <View style={{ flex: 1, gap: 6, alignItems: 'flex-end' }}>
          <Text style={s.body}>
            {member.validUntil < dateKey(new Date())
              ? 'EXPIRED'
              : 'VALID UNTIL'}
          </Text>
          <Text style={s.text}>{member.validUntil}</Text>
        </View>
      </View>
    </View>
  );
}
