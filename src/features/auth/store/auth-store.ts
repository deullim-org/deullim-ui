import { create } from 'zustand';
import type { Member } from '@/src/types/domain';

type AuthStatus = 'idle' | 'authenticated';

interface AuthState {
  member: Member | null;
  token: string | null;
  status: AuthStatus;

  setSession: (member: Member, token: string) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  member: null,
  token: null,
  status: 'idle',

  setSession: (member, token) => set({ member, token, status: 'authenticated' }),

  clear: () => set({ member: null, token: null, status: 'idle' }),
}));
