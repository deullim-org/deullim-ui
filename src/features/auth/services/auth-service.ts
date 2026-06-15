import type { Member } from '@/src/types/domain';

export interface AuthSession {
  member: Member;
  token: string;
}

export interface AuthService {
  loginWithNaver(): Promise<AuthSession>;
  logout(): Promise<void>;
  getCurrentMember(): Promise<Member | null>;
}
