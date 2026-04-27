import type { Place } from '@/src/types/domain';
import type { LocationService } from './location-service';

const MOCK_PLACES: Place[] = [
  {
    id: 'sample-place-1',
    name: '샘플 장소 1',
    address: '서울 중구 세종대로 110 (시청 인근)',
    category: '샘플',
    latitude: 37.5666805,
    longitude: 126.9784147,
  },
  {
    id: 'sample-place-2',
    name: '샘플 장소 2',
    address: '서울 강남구 강남대로 396 (강남역 인근)',
    category: '샘플',
    latitude: 37.4979,
    longitude: 127.0276,
  },
];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class MockLocationService implements LocationService {
  async search(query: string): Promise<Place[]> {
    await delay(200);
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return MOCK_PLACES.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        (p.category?.toLowerCase().includes(q) ?? false),
    );
  }

  async reverseGeocode(latitude: number, longitude: number): Promise<string | null> {
    await delay(150);
    return `${latitude.toFixed(4)}, ${longitude.toFixed(4)} (샘플 좌표)`;
  }
}
