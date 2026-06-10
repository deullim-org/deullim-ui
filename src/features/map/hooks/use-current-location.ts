import { useCallback, useEffect, useState } from 'react';
import * as ExpoLocation from 'expo-location';

interface CurrentLocation {
  latitude: number;
  longitude: number;
}

export function useCurrentLocation() {
  const [location, setLocation] = useState<CurrentLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestPermission = useCallback(async () => {
    const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
    return status === 'granted';
  }, []);

  const fetchLocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const granted = await requestPermission();
      if (!granted) {
        setError('Location permission denied');
        return null;
      }
      const result = await ExpoLocation.getCurrentPositionAsync({
        accuracy: ExpoLocation.Accuracy.Balanced,
      });
      const coords = {
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
      };
      setLocation(coords);
      return coords;
    } catch {
      setError('Failed to get current location');
      return null;
    } finally {
      setLoading(false);
    }
  }, [requestPermission]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return { location, loading, error, fetchLocation };
}
