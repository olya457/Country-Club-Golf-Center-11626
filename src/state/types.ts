import { Conditions } from '../utils/clubSelector';
export interface Member {
  firstName: string;
  lastName: string;
  number: string;
  validUntil: string;
  tier: string;
}
export interface Location {
  address: string;
  latitude: number;
  longitude: number;
}
export interface Reservation {
  id: string;
  kind: 'course' | 'coach';
  resourceId: string;
  name: string;
  date: string;
  time: string;
  price: number;
  cart: boolean;
  session?: string;
  cancelled?: boolean;
}
export interface Player {
  id: string;
  name: string;
  scores: (number | null)[];
}
export interface Round {
  id: string;
  courseId: string;
  players: Player[];
  hole: number;
  finished: boolean;
  createdAt: string;
}
export interface Coupon {
  offerId: string;
  code: string;
  terms: string;
  validUntil: string;
}
export interface AppState {
  onboarded: boolean;
  favorites: string[];
  member: Member | null;
  location: Location | null;
  reservations: Reservation[];
  rounds: Round[];
  coupons: Coupon[];
  conditions: Conditions;
}
