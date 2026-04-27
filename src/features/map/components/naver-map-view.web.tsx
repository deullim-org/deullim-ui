import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useMapStore } from '../store/map-store';
import { DEFAULT_ZOOM } from '@/src/constants/map';
import {
  type NaverMapInstance,
  useNaverMapsScript,
} from './use-naver-maps-script';

interface Props {
  onTapMap?: (latitude: number, longitude: number) => void;
  children?: React.ReactNode;
}

export interface NaverMapHandle {
  animateTo: (latitude: number, longitude: number, zoom?: number) => void;
}

const NaverMapContext = createContext<NaverMapInstance | null>(null);

export function useNaverMap() {
  return useContext(NaverMapContext);
}

const CLIENT_ID = process.env.EXPO_PUBLIC_NAVER_MAP_CLIENT_ID;

export const NaverMap = forwardRef<NaverMapHandle, Props>(
  function NaverMap({ onTapMap, children }, ref) {
    const { camera, setCamera } = useMapStore();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<NaverMapInstance | null>(null);
    const [mapInstance, setMapInstance] = useState<NaverMapInstance | null>(null);
    const onTapRef = useRef(onTapMap);
    onTapRef.current = onTapMap;

    const { ready, error } = useNaverMapsScript(CLIENT_ID);

    useImperativeHandle(ref, () => ({
      animateTo: (latitude, longitude, zoom) => {
        const naverMaps = window.naver?.maps;
        if (!mapRef.current || !naverMaps) return;
        try {
          mapRef.current.panTo(new naverMaps.LatLng(latitude, longitude));
          if (zoom != null) mapRef.current.setZoom(zoom, true);
        } catch (err) {
          console.warn('[NaverMap] animateTo failed', err);
        }
      },
    }));

    useEffect(() => {
      if (!ready || !containerRef.current || mapRef.current) return;
      const naverMaps = window.naver?.maps;
      if (!naverMaps) return;

      try {
        const map = new naverMaps.Map(containerRef.current, {
          center: new naverMaps.LatLng(camera.latitude, camera.longitude),
          zoom: camera.zoom ?? DEFAULT_ZOOM,
        });

        naverMaps.Event.addListener(map, 'click', (...args: unknown[]) => {
          const e = args[0] as { coord?: { x: number; y: number } } | undefined;
          if (e?.coord) onTapRef.current?.(e.coord.y, e.coord.x);
        });

        naverMaps.Event.addListener(map, 'idle', () => {
          const center = map.getCenter();
          setCamera({
            latitude: center.lat(),
            longitude: center.lng(),
            zoom: map.getZoom(),
          });
        });

        mapRef.current = map;
        setMapInstance(map);
      } catch (err) {
        console.error('[NaverMap] init failed', err);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ready]);

    if (error) {
      return (
        <View style={styles.fallback}>
          <Text style={styles.fallbackTitle}>Naver Map</Text>
          <Text style={styles.fallbackSubtitle}>{error}</Text>
          <Text style={styles.fallbackHint}>
            Set EXPO_PUBLIC_NAVER_MAP_CLIENT_ID in .env (see .env.example)
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <div ref={containerRef} style={mapDivStyle} />
        <NaverMapContext.Provider value={mapInstance}>{children}</NaverMapContext.Provider>
      </View>
    );
  },
);

const mapDivStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fallback: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 24,
  },
  fallbackTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0a7ea4',
  },
  fallbackSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  fallbackHint: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
  },
});
