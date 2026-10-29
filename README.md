# Country Club Golf Center

React Native + TypeScript application with React Navigation, AsyncStorage, local artwork, native camera scanning, WebView splash animation, and gradient buttons.

## Run

```sh
npm install
npm start
npm run ios
npm run android
```

Install iOS pods after changing native dependencies:

```sh
cd ios
pod install
```

CocoaPods needs a current Ruby and Node available on PATH. Android requires JDK 17 and the Android SDK. Camera scanning requires a physical camera; the manual membership form works in a simulator.

## Features

- Four-second WebView splash animation and four onboarding slides. Onboarding completion is persisted.
- Seven tabs with independent feature navigation and small-screen scrolling.
- Learn Golf: English rules, course and club guides, plus external articles and club-specific video series from The R&A, Golf Australia, Southern California PGA, and Golf Digest. Reading the built-in guides works offline; external resources require internet access.
- Responsive learning cards, wrapping section controls, and safe-area-aware layout for compact iPhones and iPhone Duo.
- Eight courses and course plans, favorites, zoom/panning, date/time selection, $40 golf cart option, saved booking details, and cancellation.
- Eight coaches, previous/next profile navigation, practice matches and personal training at a $10 premium.
- User-created rounds with up to four players, hole-by-hole scores, live rankings, completion statistics, and resumable history.
- All sixteen club recommendations using the supplied wind, distance, and surface rules. Previous selections remain available after viewing the result.
- Eight offer categories with locally stored club-issued coupon codes, terms, expiry dates, and CODE128 barcodes.
- Membership camera scanning and manual entry. Names, membership details, coupons, scores, reservations, and favorites are never prefilled with example records.

## Club information and integrations

Open the settings icon on Home to enter the actual club address, latitude, and longitude. Weather comes from [Open-Meteo](https://open-meteo.com/en/docs); the map uses OpenStreetMap and opens the device’s Maps app when tapped. Photos and illustrations are bundled in `src/assets`. Weather and map tiles require internet access.

Reservations are saved on the current device. Occupied local slots and past times cannot be booked. The repository does not include a club backend, authenticated membership database, payment service, or shared availability endpoint. Consequently, local reservation cards explicitly ask the user to confirm availability with the club. A production deployment needs those services before representing bookings as accepted by the venue or sharing scoreboards across devices.

The scanner supports QR, CODE128, PDF417, and Aztec. A self-contained membership payload must contain string fields `firstName`, `lastName`, `number`, and `validUntil` (YYYY-MM-DD); `tier` is optional. An opaque membership ID cannot reveal its owner without the club’s lookup service, so the app provides manual entry. Reading a payload is not server-side verification of membership.

Coupon discounts, codes, terms, and expiry dates were not supplied. The app therefore stores information from a real coupon entered by the user and never generates entitlement codes. The club handles redemption. Offer labels and supplied course/coach content are catalog data.

Per-hole pars were not supplied, so the scorecard reports strokes and completion without inventing a par layout. In incomplete rounds, players are ordered by holes completed first, then by fewer strokes. Complete rounds rank by total strokes.

## Structure

- `src/navigation`: typed stacks and seven-tab navigator
- `src/screens`: feature screens
- `src/components`: shared controls, cards, icons, map, barcode
- `src/state`: versioned persisted state and serialized writes
- `src/data`: supplied catalogs, learning content, external resources, and static asset imports
- `src/utils`: booking, scoring, membership, and recommendation rules
- `src/services`: weather integration
- `src/theme`: shared colors, typography, and layout

State writes are serialized, only published after successful persistence, and surfaced as errors if storage fails. Failed hydration does not overwrite saved records. AsyncStorage is local application storage, not an encrypted credential vault.

## Checks

```sh
npx tsc --noEmit
npm run lint
npm test -- --runInBand --watchman=false
```

Tests cover all supplied selector examples, every club boundary, wind and surface overrides, invalid input, score totals, date validation, booking time checks, storage failure handling, splash-to-onboarding transition, learning section navigation, and external-link success/failure handling.
