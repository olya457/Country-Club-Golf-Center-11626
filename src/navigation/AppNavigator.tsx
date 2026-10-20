import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FeatureStack } from './types';
import { useApp } from '../state/AppContext';
import { colors, styles as s } from '../theme';
import { Button } from '../components/ui';
import { Icon, IconName } from '../components/Icon';
import { SplashScreen, OnboardingScreen } from '../screens/WelcomeScreens';
import { HomeScreen, SettingsScreen } from '../screens/HomeScreen';
import { MembershipScreen } from '../screens/MembershipScreen';
import {
  CoursesScreen,
  CourseScreen,
  PlanScreen,
} from '../screens/CoursesScreen';
import { CoachesScreen, CoachScreen } from '../screens/CoachesScreen';
import { BookingScreen, ConfirmationScreen } from '../screens/BookingScreen';
import { ScorecardScreen, RoundScreen } from '../screens/ScorecardScreen';
import { SelectorScreen } from '../screens/SelectorScreen';
import { CouponsScreen, CouponScreen } from '../screens/CouponsScreen';
const Stack = createNativeStackNavigator<FeatureStack>();
const Tabs = createBottomTabNavigator();
const stackOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: colors.background },
};
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name="List" component={HomeScreen} />
      <Stack.Screen name="Scan" component={MembershipScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
function CoursesStack() {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name="List" component={CoursesScreen} />
      <Stack.Screen name="Course" component={CourseScreen} />
      <Stack.Screen name="Plan" component={PlanScreen} />
      <Stack.Screen name="Book" component={BookingScreen} />
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
    </Stack.Navigator>
  );
}
function CoachesStack() {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name="List" component={CoachesScreen} />
      <Stack.Screen name="Coach" component={CoachScreen} />
      <Stack.Screen name="Book" component={BookingScreen} />
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
    </Stack.Navigator>
  );
}
function ScoreStack() {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name="List" component={ScorecardScreen} />
      <Stack.Screen name="Round" component={RoundScreen} />
    </Stack.Navigator>
  );
}
function CouponStack() {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name="List" component={CouponsScreen} />
      <Stack.Screen name="Coupon" component={CouponScreen} />
    </Stack.Navigator>
  );
}
const icons: Record<string, IconName> = {
  Home: 'home',
  Courses: 'flag',
  Coaches: 'coach',
  Scorecard: 'score',
  Selector: 'club',
  Coupons: 'coupon',
};
export function AppNavigator() {
  const { state, ready, error, retry } = useApp();
  const [splash, setSplash] = useState(true);
  const insets = useSafeAreaInsets();
  const finish = useCallback(() => setSplash(false), []);
  if (splash) {
    return <SplashScreen onComplete={finish} />;
  }
  if (!ready) {
    return (
      <View
        style={[s.fill, { justifyContent: 'center', padding: 24, gap: 20 }]}
      >
        {error ? (
          <>
            <Text style={s.error}>{error}</Text>
            <Button title="Retry loading" onPress={retry} />
          </>
        ) : (
          <ActivityIndicator color={colors.gold} />
        )}
      </View>
    );
  }
  if (!state.onboarded) {
    return <OnboardingScreen />;
  }
  return (
    <NavigationContainer
      theme={{
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          primary: colors.gold,
          background: colors.background,
          card: colors.nav,
          text: colors.text,
          border: colors.line,
        },
      }}
    >
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.gold,
          tabBarInactiveTintColor: colors.muted,
          tabBarAccessibilityLabel: route.name,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            backgroundColor: colors.nav,
            borderTopColor: colors.line,
            height: 58 + insets.bottom,
            paddingTop: 8,
            paddingBottom: Math.max(insets.bottom, 8),
          },
          tabBarIcon: ({ color }) => (
            <Icon name={icons[route.name]} color={color} size={23} />
          ),
        })}
      >
        <Tabs.Screen name="Home" component={HomeStack} />
        <Tabs.Screen name="Courses" component={CoursesStack} />
        <Tabs.Screen name="Coaches" component={CoachesStack} />
        <Tabs.Screen name="Scorecard" component={ScoreStack} />
        <Tabs.Screen name="Selector" component={SelectorScreen} />
        <Tabs.Screen name="Coupons" component={CouponStack} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
