import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCurrentLocation } from '../hooks/use-current-location';
import { useMapStore } from '../store/map-store';
import { MARKER_ZOOM } from '@/src/constants/map';

export function CurrentLocationButton() {
  const { fetchLocation, loading } = useCurrentLocation();
  const moveCamera = useMapStore((s) => s.moveCamera);

  const handlePress = async () => {
    const coords = await fetchLocation();
    if (coords) {
      moveCamera(coords.latitude, coords.longitude, MARKER_ZOOM);
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#333" />
      ) : (
        <Ionicons name="locate" size={24} color="#333" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
