import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/src/features/auth/hooks/use-auth';

const NAVER_GREEN = '#03C75A';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { login, loading, error } = useAuth();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.hero}>
        <Text style={styles.logo}>들림</Text>
        <Text style={styles.tagline}>장소에 메모를 남겨보세요</Text>
      </View>

      <View style={styles.footer}>
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          style={({ pressed }) => [styles.naverButton, pressed && styles.naverButtonPressed]}
          onPress={login}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.naverMark}>N</Text>
              <Text style={styles.naverLabel}>네이버로 로그인</Text>
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  logo: {
    fontSize: 56,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: '#999',
  },
  footer: {
    paddingBottom: 24,
    gap: 12,
  },
  error: {
    color: '#e03131',
    textAlign: 'center',
    fontSize: 14,
  },
  naverButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    borderRadius: 12,
    backgroundColor: NAVER_GREEN,
  },
  naverButtonPressed: {
    opacity: 0.85,
  },
  naverMark: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
  naverLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
