import { StyleSheet, View } from 'react-native';
import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';
import type { Memo } from '@/src/types/domain';

interface Props {
  memo: Memo;
  onPress?: (memo: Memo) => void;
}

export function MapMarker({ memo, onPress }: Props) {
  return (
    <NaverMapMarkerOverlay
      latitude={memo.location.latitude}
      longitude={memo.location.longitude}
      onTap={() => onPress?.(memo)}
      anchor={{ x: 0.5, y: 0.5 }}
      width={16}
      height={16}
    >
      <View style={styles.memoDot} />
    </NaverMapMarkerOverlay>
  );
}

export function DroppedPinMarker({ latitude, longitude }: { latitude: number; longitude: number }) {
  return (
    <NaverMapMarkerOverlay
      latitude={latitude}
      longitude={longitude}
      anchor={{ x: 0.5, y: 0.5 }}
      width={18}
      height={18}
    >
      <View style={styles.pinDot} />
    </NaverMapMarkerOverlay>
  );
}

const styles = StyleSheet.create({
  memoDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#0a7ea4',
    borderWidth: 2,
    borderColor: '#fff',
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E53E3E',
    borderWidth: 2,
    borderColor: '#fff',
  },
});
