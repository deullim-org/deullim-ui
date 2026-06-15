import type { Member } from '@/src/types/domain';
import type { AuthService, AuthSession } from './auth-service';

const MOCK_MEMBER: Member = {
  id: 'demo-user',
  nickname: '들림이',
  email: 'demo@deullim.app',
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class MockAuthService implements AuthService {
  private member: Member | null = null;

  async loginWithNaver(): Promise<AuthSession> {
    await delay(600);
    this.member = MOCK_MEMBER;
    return { member: MOCK_MEMBER, token: `mock-naver-token-${Date.now()}` };
  }

  async logout(): Promise<void> {
    await delay(200);
    this.member = null;
  }

  async getCurrentMember(): Promise<Member | null> {
    await delay(100);
    return this.member;
  }
}
