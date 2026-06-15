import { useCallback, useState } from 'react';
import { useAuthStore } from '../store/auth-store';
import { getService } from '@/src/services/service-registry';

export function useAuth() {
  const { member, status, setSession, clear } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authService = getService('auth');

  const login = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const session = await authService.loginWithNaver();
      setSession(session.member, session.token);
      return session;
    } catch {
      setError('Failed to sign in with Naver');
      return null;
    } finally {
      setLoading(false);
    }
  }, [authService, setSession]);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authService.logout();
      clear();
    } catch {
      setError('Failed to sign out');
    } finally {
      setLoading(false);
    }
  }, [authService, clear]);

  return {
    member,
    isAuthenticated: status === 'authenticated',
    loading,
    error,
    login,
    logout,
  };
}
