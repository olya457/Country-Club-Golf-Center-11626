export type FeatureStack = {
  List: undefined;
  Course: { id: string };
  Plan: { id: string };
  Book: { kind: 'course' | 'coach'; id: string };
  Coach: { index: number };
  Confirmation: { id: string };
  Scan: undefined;
  Settings: undefined;
  Coupon: { id: string };
  Round: { id: string };
};
