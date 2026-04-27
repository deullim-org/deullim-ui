import { create } from 'zustand';
import type { Memo } from '@/src/types/domain';

interface MemoState {
  memos: Memo[];
  loading: boolean;
  error: string | null;

  setMemos: (memos: Memo[]) => void;
  addMemo: (memo: Memo) => void;
  updateMemo: (id: string, updates: Partial<Memo>) => void;
  removeMemo: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMemoStore = create<MemoState>((set) => ({
  memos: [],
  loading: false,
  error: null,

  setMemos: (memos) => set({ memos }),

  addMemo: (memo) =>
    set((state) => ({ memos: [memo, ...state.memos] })),

  updateMemo: (id, updates) =>
    set((state) => ({
      memos: state.memos.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    })),

  removeMemo: (id) =>
    set((state) => ({ memos: state.memos.filter((m) => m.id !== id) })),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
