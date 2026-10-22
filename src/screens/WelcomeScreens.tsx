import { ScreenReveal } from '../components/ScreenReveal';
import { useLayout } from '../hooks/useLayout';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { artwork, onboarding } from '../data/catalog';
import { ClubLogo, ClubEmblem } from '../components/ClubLogo';
import { Button } from '../components/ui';
import { useApp } from '../state/AppContext';
import { colors, styles as s } from '../theme';
const animation = `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>html,body{margin:0;background:transparent;overflow:hidden}.dots{display:flex;justify-content:center;align-items:center;height:80px}i{display:block;width:38px;height:38px;border-radius:50%;background:${colors.gold};margin:-4px;animation:pulse 1s ease-in-out 4}i:nth-child(2){animation-delay:.15s}i:nth-child(3){animation-delay:.3s}@keyframes pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}@media(prefers-reduced-motion:reduce){i{animation:none;opacity:.7}}</style></head><body><div class="dots"><i></i><i></i><i></i></div><script>setTimeout(function(){window.ReactNativeWebView.postMessage('complete')},4000)</script></body></html>`;
export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const layout = useLayout();
  const done = useRef(false);
  const finish = useCallback(() => {
    if (!done.current) {
      done.current = true;
      onComplete();
    }
  }, [onComplete]);
  useEffect(() => {
    const timeout = setTimeout(finish, 6500);
    return () => clearTimeout(timeout);
  }, [finish]);
  return (
    <ImageBackground source={artwork.hero} style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.photoOverlay,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: layout.height < 700 ? 16 : 30,
          paddingBottom: layout.height < 700 ? 16 : 36,
        }}
      >
        <ScreenReveal
          style={{ alignItems: 'center', gap: layout.height < 700 ? 12 : 22 }}
        >
          <ClubLogo />
        </ScreenReveal>
        <ClubEmblem size={Math.min(180, layout.height * 0.22)} />
        <View style={{ height: 90, width: '100%' }}>
          <WebView
            source={{ html: animation }}
            originWhitelist={['about:blank']}
            scrollEnabled={false}
            style={{ backgroundColor: 'transparent' }}
            onMessage={event => {
              if (event.nativeEvent.data === 'complete') {
                finish();
              }
            }}
            onError={finish}
            javaScriptEnabled
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
export function OnboardingScreen() {
  const layout = useLayout();
  const [index, setIndex] = useState(0);
  const { update } = useApp();
  const slide = onboarding[index];
  const finish = () => update(state => ({ ...state, onboarded: true }));
  return (
    <ImageBackground source={slide.image} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.photoOverlay }}>
        <View style={{ alignItems: 'flex-end', paddingHorizontal: 20 }}>
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              void finish().catch(() =>
                Alert.alert('Could not save', 'Please try again.'),
              );
            }}
            style={{ padding: 16 }}
          >
            <Text style={[s.body, { letterSpacing: 2, fontSize: 12 }]}>
              SKIP
            </Text>
          </Pressable>
        </View>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-end',
            padding: layout.padding,
            paddingTop: Math.min(220, layout.height * 0.18),
          }}
        >
          <ScreenReveal
            replayKey={index}
            style={{ gap: layout.compact ? 14 : 22 }}
          >
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {onboarding.map((_, position) => (
                <View
                  key={position}
                  style={{
                    flex: 1,
                    height: 3,
                    backgroundColor:
                      position <= index ? colors.gold : colors.line,
                  }}
                />
              ))}
            </View>
            <Text
              style={[
                s.title,
                {
                  fontSize: layout.titleSize,
                  lineHeight: layout.titleSize + 6,
                },
              ]}
            >
              {slide.title}
            </Text>
            <Text style={s.body}>{slide.body}</Text>
            <View
              style={{ marginTop: layout.compact ? 12 : 28, marginBottom: 12 }}
            >
              <Button
                title={index === 3 ? 'Get started' : 'Next'}
                onPress={index === 3 ? finish : () => setIndex(index + 1)}
              />
            </View>
          </ScreenReveal>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
