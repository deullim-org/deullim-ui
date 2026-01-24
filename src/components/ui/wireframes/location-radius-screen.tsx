import { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import * as Location from 'expo-location';

import { ThemedText } from '@/src/components/shared/themed-text';
import { ThemedView } from '@/src/components/shared/themed-view';

const DEFAULT_LOCATION = { latitude: 37.5665, longitude: 126.978 }; // 서울시청
const RADIUS = 500; // 500m 고정

export function LocationRadiusScreen() {
  const [location, setLocation] = useState(DEFAULT_LOCATION);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      }
    })();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <ThemedText>←</ThemedText>
          </TouchableOpacity>
          <ThemedText type="subtitle">위치 반경 설정</ThemedText>
          <View style={styles.placeholder} />
        </View>

        {/* Map */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={{
              ...location,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Circle
              center={location}
              radius={RADIUS}
              strokeColor="#0a7ea4"
              strokeWidth={2}
              fillColor="rgba(10, 126, 164, 0.15)"
            />
          </MapView>
          <View style={styles.radiusLabelContainer}>
            <ThemedText style={styles.radiusLabel}>{RADIUS}m</ThemedText>
          </View>
        </View>

        {/* Radius Slider Section */}
        <View style={styles.sliderSection}>
          <View style={styles.sliderHeader}>
            <ThemedText type="defaultSemiBold">검색 반경</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.radiusValue}>
              500m
            </ThemedText>
          </View>

          <View style={styles.sliderTrack}>
            <View style={styles.sliderFill} />
            <View style={styles.sliderThumb} />
          </View>

          <View style={styles.sliderLabels}>
            <ThemedText style={styles.sliderLabel}>50m</ThemedText>
            <ThemedText style={styles.sliderLabel}>2km</ThemedText>
          </View>
        </View>

        {/* Quick Select Options */}
        <View style={styles.quickOptions}>
          <ThemedText type="defaultSemiBold" style={styles.quickTitle}>
            빠른 선택
          </ThemedText>
          <View style={styles.optionButtons}>
            {['100m', '300m', '500m', '1km', '2km'].map((distance) => (
              <TouchableOpacity
                key={distance}
                style={[styles.optionButton, distance === '500m' && styles.optionButtonActive]}
              >
                <ThemedText
                  style={[styles.optionText, distance === '500m' && styles.optionTextActive]}
                >
                  {distance}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmButton}>
          <ThemedText style={styles.confirmButtonText}>설정 완료</ThemedText>
        </TouchableOpacity>
      </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  mapContainer: {
    flex: 1,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  radiusLabelContainer: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  radiusLabel: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  sliderSection: {
    paddingVertical: 20,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  radiusValue: {
    color: '#0a7ea4',
  },
  sliderTrack: {
    height: 6,
    backgroundColor: '#E5E5E5',
    borderRadius: 3,
    position: 'relative',
  },
  sliderFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '23%',
    height: '100%',
    backgroundColor: '#0a7ea4',
    borderRadius: 3,
  },
  sliderThumb: {
    position: 'absolute',
    left: '23%',
    top: -9,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0a7ea4',
    marginLeft: -12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sliderLabel: {
    color: '#999',
    fontSize: 12,
  },
  quickOptions: {
    paddingVertical: 16,
  },
  quickTitle: {
    marginBottom: 12,
  },
  optionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
  },
  optionButtonActive: {
    borderColor: '#0a7ea4',
    backgroundColor: 'rgba(10, 126, 164, 0.1)',
  },
  optionText: {
    color: '#666',
  },
  optionTextActive: {
    color: '#0a7ea4',
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
