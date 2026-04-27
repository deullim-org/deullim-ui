import { useRef, useCallback, useImperativeHandle, forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import {
  NaverMapView as RNNaverMapView,
  type NaverMapViewRef,
} from '@mj-studio/react-native-naver-map';
import { useMapStore } from '../store/map-store';
import { DEFAULT_ZOOM } from '@/src/constants/map';

interface Props {
  onTapMap?: (latitude: number, longitude: number) => void;
  children?: React.ReactNode;
}

export interface NaverMapHandle {
  animateTo: (latitude: number, longitude: number, zoom?: number) => void;
}

export const NaverMap = forwardRef<NaverMapHandle, Props>(
  function NaverMap({ onTapMap, children }, ref) {
    const mapRef = useRef<NaverMapViewRef>(null);
    const { camera, setCamera } = useMapStore();

    useImperativeHandle(ref, () => ({
      animateTo: (latitude: number, longitude: number, zoom?: number) => {
        mapRef.current?.animateCameraTo({
          latitude,
          longitude,
          zoom: zoom ?? DEFAULT_ZOOM,
          duration: 500,
        });
      },
    }));

    const handleCameraChanged = useCallback(
      (args: { latitude: number; longitude: number; zoom?: number }) => {
        setCamera({
          latitude: args.latitude,
          longitude: args.longitude,
          zoom: args.zoom ?? DEFAULT_ZOOM,
        });
      },
      [setCamera],
    );

    const handleTapMap = useCallback(
      (params: { latitude: number; longitude: number; x: number; y: number }) => {
        onTapMap?.(params.latitude, params.longitude);
      },
      [onTapMap],
    );

    return (
      <RNNaverMapView
        ref={mapRef}
        style={styles.map}
        initialCamera={{
          latitude: camera.latitude,
          longitude: camera.longitude,
          zoom: camera.zoom,
        }}
        onCameraChanged={handleCameraChanged}
        onTapMap={handleTapMap}
        isShowLocationButton={false}
        isShowZoomControls={false}
        isShowCompass={false}
        isShowScaleBar={false}
      >
        {children}
      </RNNaverMapView>
    );
  },
);

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
