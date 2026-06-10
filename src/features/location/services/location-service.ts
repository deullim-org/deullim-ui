import type { Place } from '@/src/types/domain';

export interface LocationService {
  search(query: string): Promise<Place[]>;
  reverseGeocode(latitude: number, longitude: number): Promise<string | null>;
}
