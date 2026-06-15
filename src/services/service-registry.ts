import type { AuthService } from '@/src/features/auth/services/auth-service';
import type { LocationService } from '@/src/features/location/services/location-service';
import type { MemoService } from '@/src/features/memo/services/memo-service';
import { MockAuthService } from '@/src/features/auth/services/auth-service.mock';
import { MockLocationService } from '@/src/features/location/services/location-service.mock';
import { MockMemoService } from '@/src/features/memo/services/memo-service.mock';

interface ServiceRegistry {
  auth: AuthService;
  location: LocationService;
  memo: MemoService;
}

const registry: ServiceRegistry = {
  auth: new MockAuthService(),
  location: new MockLocationService(),
  memo: new MockMemoService(),
};

export function getService<K extends keyof ServiceRegistry>(name: K): ServiceRegistry[K] {
  return registry[name];
}
