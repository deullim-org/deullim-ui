import { useEffect } from 'react';
import { useNaverMap } from './naver-map-view.web';
import type { Memo } from '@/src/types/domain';

const MEMO_DOT_HTML = `
  <div style="
    width: 14px; height: 14px; border-radius: 50%;
    background: #0a7ea4; border: 2px solid #fff;
    box-sizing: content-box;
  "></div>
`;

const PIN_DOT_HTML = `
  <div style="
    width: 16px; height: 16px; border-radius: 50%;
    background: #E53E3E; border: 2px solid #fff;
    box-sizing: content-box;
  "></div>
`;

interface MarkerProps {
  memo: Memo;
  onPress?: (memo: Memo) => void;
}

export function MapMarker({ memo, onPress }: MarkerProps) {
  const map = useNaverMap();

  useEffect(() => {
    const naverMaps = window.naver?.maps;
    if (!map || !naverMaps) return;

    try {
      const marker = new naverMaps.Marker({
        position: new naverMaps.LatLng(memo.location.latitude, memo.location.longitude),
        map,
        icon: {
          content: MEMO_DOT_HTML,
          anchor: new naverMaps.Point(9, 9),
        },
      });

      naverMaps.Event.addListener(marker, 'click', () => {
        onPress?.(memo);
      });

      return () => {
        try {
          marker.setMap(null);
        } catch (err) {
          console.warn('[MapMarker] cleanup failed', err);
        }
      };
    } catch (err) {
      console.error('[MapMarker] create failed', err);
    }
  }, [map, memo, onPress]);

  return null;
}

interface PinProps {
  latitude: number;
  longitude: number;
}

export function DroppedPinMarker({ latitude, longitude }: PinProps) {
  const map = useNaverMap();

  useEffect(() => {
    const naverMaps = window.naver?.maps;
    if (!map || !naverMaps) return;

    try {
      const marker = new naverMaps.Marker({
        position: new naverMaps.LatLng(latitude, longitude),
        map,
        icon: {
          content: PIN_DOT_HTML,
          anchor: new naverMaps.Point(10, 10),
        },
        zIndex: 1000,
      });

      return () => {
        try {
          marker.setMap(null);
        } catch (err) {
          console.warn('[DroppedPinMarker] cleanup failed', err);
        }
      };
    } catch (err) {
      console.error('[DroppedPinMarker] create failed', err);
    }
  }, [map, latitude, longitude]);

  return null;
}
