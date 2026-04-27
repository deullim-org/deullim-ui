import { useEffect, useState } from 'react';

declare global {
  interface Window {
    naver?: {
      maps: NaverMaps;
    };
  }
}

interface NaverMaps {
  Map: new (el: HTMLElement, options: NaverMapOptions) => NaverMapInstance;
  LatLng: new (lat: number, lng: number) => NaverLatLng;
  Marker: new (options: NaverMarkerOptions) => NaverMarker;
  Point: new (x: number, y: number) => unknown;
  Event: {
    addListener: (target: unknown, event: string, handler: (...args: unknown[]) => void) => void;
  };
}

export interface NaverLatLng {
  lat: () => number;
  lng: () => number;
}

export interface NaverMapOptions {
  center: NaverLatLng;
  zoom?: number;
}

export interface NaverMapInstance {
  panTo: (latlng: NaverLatLng, opts?: { duration?: number }) => void;
  setCenter: (latlng: NaverLatLng) => void;
  setZoom: (zoom: number, useEffect?: boolean) => void;
  getCenter: () => NaverLatLng;
  getZoom: () => number;
}

export interface NaverMarkerOptions {
  position: NaverLatLng;
  map: NaverMapInstance;
  icon?: { content: string; anchor?: unknown };
  zIndex?: number;
}

export interface NaverMarker {
  setMap: (map: NaverMapInstance | null) => void;
}

const SCRIPT_ID = 'naver-maps-script';

export type NaverMapsScriptStatus = {
  ready: boolean;
  error: string | null;
};

export function useNaverMapsScript(clientId: string | undefined): NaverMapsScriptStatus {
  const [status, setStatus] = useState<NaverMapsScriptStatus>({ ready: false, error: null });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!clientId || clientId === 'YOUR_NAVER_MAP_CLIENT_ID') {
      setStatus({ ready: false, error: 'EXPO_PUBLIC_NAVER_MAP_CLIENT_ID is not set' });
      return;
    }

    if (window.naver?.maps) {
      setStatus({ ready: true, error: null });
      return;
    }

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    const onLoad = () => setStatus({ ready: true, error: null });
    const onError = () => setStatus({ ready: false, error: 'Failed to load Naver Maps SDK' });

    if (existing) {
      existing.addEventListener('load', onLoad);
      existing.addEventListener('error', onError);
      return () => {
        existing.removeEventListener('load', onLoad);
        existing.removeEventListener('error', onError);
      };
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(
      clientId,
    )}`;
    script.async = true;
    script.addEventListener('load', onLoad);
    script.addEventListener('error', onError);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener('load', onLoad);
      script.removeEventListener('error', onError);
    };
  }, [clientId]);

  return status;
}
