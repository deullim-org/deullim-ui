import { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';

import { NaverMap, type NaverMapHandle } from '@/src/features/map/components/naver-map-view';
import { CurrentLocationButton } from '@/src/features/map/components/current-location-button';
import { MapSearchBar } from '@/src/features/map/components/map-search-bar';
import { MapMarker, DroppedPinMarker } from '@/src/features/map/components/map-marker';
import { LocationDetailSheet } from '@/src/features/map/components/location-detail-sheet';
import { useMapStore } from '@/src/features/map/store/map-store';
import { useMemos } from '@/src/features/memo/hooks/use-memos';
import type { Memo } from '@/src/types/domain';

export default function MapScreen() {
  const mapRef = useRef<NaverMapHandle>(null);
  const { dropPin, selectLocation, droppedPin } = useMapStore();
  const { memos } = useMemos();

  const handleTapMap = useCallback(
    (latitude: number, longitude: number) => {
      if (process.env.EXPO_OS === 'ios') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      dropPin(latitude, longitude);
    },
    [dropPin],
  );

  const handleMarkerPress = useCallback(
    (memo: Memo) => {
      selectLocation(memo.location);
    },
    [selectLocation],
  );

  return (
    <View style={styles.container}>
      <NaverMap ref={mapRef} onTapMap={handleTapMap}>
        {memos.map((memo) => (
          <MapMarker key={memo.id} memo={memo} onPress={handleMarkerPress} />
        ))}
        {droppedPin && (
          <DroppedPinMarker
            latitude={droppedPin.latitude}
            longitude={droppedPin.longitude}
          />
        )}
      </NaverMap>
      <MapSearchBar />
      <CurrentLocationButton />
      <LocationDetailSheet />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
