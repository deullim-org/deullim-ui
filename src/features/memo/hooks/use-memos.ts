import { useCallback, useEffect } from 'react';
import { useMemoStore } from '../store/memo-store';
import { getService } from '@/src/services/service-registry';
import type { Location } from '@/src/types/domain';

export function useMemos() {
  const { memos, loading, error, setMemos, addMemo, updateMemo, removeMemo, setLoading, setError } =
    useMemoStore();

  const memoService = getService('memo');

  const loadMemos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await memoService.getMemos();
      setMemos(result);
    } catch {
      setError('Failed to load memos');
    } finally {
      setLoading(false);
    }
  }, [memoService, setMemos, setLoading, setError]);

  const createMemo = useCallback(
    async (title: string, content: string, location: Location) => {
      setLoading(true);
      try {
        const memo = await memoService.createMemo({ title, content, location });
        addMemo(memo);
        return memo;
      } catch {
        setError('Failed to create memo');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [memoService, addMemo, setLoading, setError],
  );

  const editMemo = useCallback(
    async (id: string, title?: string, content?: string) => {
      setLoading(true);
      try {
        const updated = await memoService.updateMemo(id, { title, content });
        updateMemo(id, updated);
        return updated;
      } catch {
        setError('Failed to update memo');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [memoService, updateMemo, setLoading, setError],
  );

  const deleteMemo = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        await memoService.deleteMemo(id);
        removeMemo(id);
      } catch {
        setError('Failed to delete memo');
      } finally {
        setLoading(false);
      }
    },
    [memoService, removeMemo, setLoading, setError],
  );

  useEffect(() => {
    loadMemos();
  }, [loadMemos]);

  return { memos, loading, error, loadMemos, createMemo, editMemo, deleteMemo };
}
