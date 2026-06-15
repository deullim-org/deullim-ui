import Slider from '@react-native-community/slider';
import Constants from 'expo-constants';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MAX_RADIUS_M, MIN_RADIUS_M, RADIUS_STEP_M } from '@/src/constants/notification';
import { useAuth } from '@/src/features/auth/hooks/use-auth';
import { useSettingsStore } from '@/src/features/settings/store/settings-store';
import { formatDistance } from '@/src/features/settings/utils/format-distance';

const PRIMARY = '#0a7ea4';
const APP_VERSION = Constants.expoConfig?.version ?? '—';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { member, logout, loading } = useAuth();
  const radius = useSettingsStore((state) => state.notificationRadiusMeters);
  const setRadius = useSettingsStore((state) => state.setNotificationRadius);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>내 정보</Text>
        <View style={[styles.card, styles.profileCard]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{member?.nickname?.charAt(0) ?? '?'}</Text>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.nickname}>{member?.nickname ?? '게스트'}</Text>
            <Text style={styles.email}>{member?.email ?? '-'}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>알림</Text>
        <View style={styles.card}>
          <View style={styles.radiusHeader}>
            <Text style={styles.radiusLabel}>푸시 알림 거리</Text>
            <Text style={styles.radiusValue}>{formatDistance(radius)}</Text>
          </View>
          <Text style={styles.radiusHint}>이 거리 안에 들어오면 메모 알림을 받아요.</Text>
          <Slider
            style={styles.slider}
            minimumValue={MIN_RADIUS_M}
            maximumValue={MAX_RADIUS_M}
            step={RADIUS_STEP_M}
            value={radius}
            onValueChange={setRadius}
            minimumTrackTintColor={PRIMARY}
            maximumTrackTintColor="#e0e0e0"
            thumbTintColor={PRIMARY}
          />
          <View style={styles.sliderScale}>
            <Text style={styles.scaleText}>{formatDistance(MIN_RADIUS_M)}</Text>
            <Text style={styles.scaleText}>{formatDistance(MAX_RADIUS_M)}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>정보</Text>
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>앱 버전</Text>
            <Text style={styles.infoValue}>{APP_VERSION}</Text>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [styles.logoutButton, pressed && styles.logoutPressed]}
          onPress={logout}
          disabled={loading}
        >
          <Text style={styles.logoutText}>로그아웃</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  content: {
    padding: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
    marginTop: 16,
    marginBottom: 4,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  profileText: {
    flex: 1,
    gap: 2,
  },
  nickname: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  email: {
    fontSize: 14,
    color: '#999',
  },
  radiusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radiusLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  radiusValue: {
    fontSize: 16,
    fontWeight: '700',
    color: PRIMARY,
  },
  radiusHint: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 4,
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: 8,
  },
  sliderScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scaleText: {
    fontSize: 12,
    color: '#bbb',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoLabel: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  infoValue: {
    fontSize: 16,
    color: '#999',
  },
  logoutButton: {
    marginTop: 24,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0d0d0',
  },
  logoutPressed: {
    opacity: 0.7,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e03131',
  },
});
