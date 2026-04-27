import { useEffect, useState } from 'react';
import { getService } from '@/src/services/service-registry';

export function useReverseGeocode(latitude: number | undefined, longitude: number | undefined) {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (latitude == null || longitude == null) {
      setAddress(null);
      return;
    }

    let cancelled = false;
    setLoading(true);

    getService('location')
      .reverseGeocode(latitude, longitude)
      .then((result) => {
        if (!cancelled) setAddress(result);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [latitude, longitude]);

  return { address, loading };
}
