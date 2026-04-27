import type { Memo } from '@/src/types/domain';

// Markers are rendered inside the native NaverMapView on iOS/Android.
// On web the map is a placeholder until the JS SDK is wired up,
// so markers render as no-ops.
export function MapMarker(_props: { memo: Memo; onPress?: (memo: Memo) => void }) {
  return null;
}

export function DroppedPinMarker(_props: { latitude: number; longitude: number }) {
  return null;
}
