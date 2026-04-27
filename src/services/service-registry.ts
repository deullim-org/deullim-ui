import type { LocationService } from '@/src/features/location/services/location-service';
import type { MemoService } from '@/src/features/memo/services/memo-service';
import { MockLocationService } from '@/src/features/location/services/location-service.mock';
import { MockMemoService } from '@/src/features/memo/services/memo-service.mock';

interface ServiceRegistry {
  location: LocationService;
  memo: MemoService;
}

const registry: ServiceRegistry = {
  location: new MockLocationService(),
  memo: new MockMemoService(),
};

export function getService<K extends keyof ServiceRegistry>(name: K): ServiceRegistry[K] {
  return registry[name];
}