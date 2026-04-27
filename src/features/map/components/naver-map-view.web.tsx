import { forwardRef, useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useMapStore } from '../store/map-store';

interface Props {
  onTapMap?: (latitude: number, longitude: number) => void;
  children?: React.ReactNode;
}

export interface NaverMapHandle {
  animateTo: (latitude: number, longitude: number, zoom?: number) => void;
}

export const NaverMap = forwardRef<NaverMapHandle, Props>(
  function NaverMap({ onTapMap, children }, _ref) {
    const { camera } = useMapStore();

    const handlePress = useCallback(() => {
      const offsetLat = (Math.random() - 0.5) * 0.01;
      const offsetLng = (Math.random() - 0.5) * 0.01;
      onTapMap?.(camera.latitude + offsetLat, camera.longitude + offsetLng);
    }, [onTapMap, camera]);

    return (
      <Pressable style={styles.container} onPress={handlePress}>
        <View style={styles.placeholder}>
          <Text style={styles.title}>Naver Map</Text>
          <Text style={styles.subtitle}>Native only — web preview</Text>
          <Text style={styles.coords}>
            {camera.latitude.toFixed(4)}, {camera.longitude.toFixed(4)} (zoom {camera.zoom})
          </Text>
          <Text style={styles.hint}>Tap to simulate pin drop</Text>
        </View>
        {children}
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#e8f4e8',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2d6a2d',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  coords: {
    fontSize: 13,
    color: '#888',
    fontFamily: 'monospace',
  },
  hint: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 8,
  },
});
