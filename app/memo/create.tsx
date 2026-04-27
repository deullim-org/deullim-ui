import { useCallback } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MemoForm } from '@/src/features/memo/components/memo-form';
import { useMemos } from '@/src/features/memo/hooks/use-memos';

export default function CreateMemoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    latitude: string;
    longitude: string;
    name: string;
    address: string;
    locationId: string;
  }>();
  const { createMemo, loading } = useMemos();

  const handleSubmit = useCallback(
    async (title: string, content: string) => {
      const location = {
        id: params.locationId || `loc-${Date.now()}`,
        latitude: parseFloat(params.latitude),
        longitude: parseFloat(params.longitude),
        name: params.name || undefined,
        address: params.address || undefined,
      };
      const memo = await createMemo(title, content, location);
      if (memo) {
        router.back();
      }
    },
    [createMemo, params, router],
  );

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <MemoForm
      locationName={params.name}
      locationAddress={params.address}
      loading={loading}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      submitLabel="Create"
    />
  );
}
