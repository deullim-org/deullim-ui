import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/src/components/shared/themed-text';
import { ThemedView } from '@/src/components/shared/themed-view';
import {
  LocationRadiusScreen,
  OAuthSignupScreen,
  PlaceSearchScreen,
} from '@/src/components/ui/wireframes';

type ScreenType = 'list' | 'location' | 'oauth' | 'search';

const SCREENS = [
  { id: 'location' as const, name: '위치 반경 설정', component: LocationRadiusScreen },
  { id: 'oauth' as const, name: 'OAuth 가입', component: OAuthSignupScreen },
  { id: 'search' as const, name: '장소 검색', component: PlaceSearchScreen },
];

export default function WireframesScreen() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('list');

  if (activeScreen !== 'list') {
    const screen = SCREENS.find((s) => s.id === activeScreen);
    if (screen) {
      const Component = screen.component;
      return (
        <>
          <Component />
          <TouchableOpacity
            style={styles.floatingBackButton}
            onPress={() => setActiveScreen('list')}
          >
            <ThemedText style={styles.floatingBackText}>← 목록</ThemedText>
          </TouchableOpacity>
          </>
      );
    }
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          와이어프레임
        </ThemedText>
        <ThemedText style={styles.subtitle}>화면을 선택하여 미리보기</ThemedText>

        <ScrollView style={styles.list}>
          {SCREENS.map((screen) => (
            <TouchableOpacity
              key={screen.id}
              style={styles.listItem}
              onPress={() => setActiveScreen(screen.id)}
            >
              <View style={styles.listItemContent}>
                <ThemedText type="defaultSemiBold">{screen.name}</ThemedText>
                <ThemedText style={styles.listItemArrow}>→</ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
    marginBottom: 24,
  },
  list: {
    flex: 1,
  },
  listItem: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  listItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  listItemArrow: {
    color: '#0a7ea4',
    fontSize: 18,
  },
  fullScreen: {
    flex: 1,
  },
  floatingBackButton: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  floatingBackText: {
    color: '#fff',
    fontWeight: '600',
  },
});
