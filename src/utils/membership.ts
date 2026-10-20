import { Member } from '../state/types';
export function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const parsed = new Date(`${value}T12:00:00Z`);
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value
  );
}
export function parseMember(raw: string): Member {
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error(
      'This code does not contain membership details. Enter the information printed on your ticket.',
    );
  }
  for (const key of ['firstName', 'lastName', 'number', 'validUntil']) {
    if (
      typeof data?.[key] !== 'string' ||
      !data[key].trim() ||
      data[key].length > 100
    ) {
      throw new Error('The ticket is missing valid membership details.');
    }
  }
  if (!validDate(data.validUntil)) {
    throw new Error('Invalid membership expiry date. Use YYYY-MM-DD.');
  }
  return {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    number: data.number.trim(),
    validUntil: data.validUntil,
    tier: typeof data.tier === 'string' ? data.tier.slice(0, 60) : 'Member',
  };
}
