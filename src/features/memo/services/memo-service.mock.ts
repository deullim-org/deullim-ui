import type { Memo } from '@/src/types/domain';
import type { MemoService, CreateMemoInput, UpdateMemoInput } from './memo-service';

const MOCK_MEMOS: Memo[] = [
  {
    id: 'sample-memo-1',
    title: '샘플 메모 1',
    content:
      '와이어프레임용 더미 데이터입니다. 핀을 떨어뜨리거나 검색을 통해 새 메모를 만들어 보세요.',
    location: {
      id: 'sample-place-1',
      latitude: 37.5666805,
      longitude: 126.9784147,
      name: '샘플 장소 1',
      address: '서울 중구 세종대로 110 (시청 인근)',
    },
    createdAt: '2025-01-01T09:00:00Z',
    updatedAt: '2025-01-01T09:00:00Z',
    memberId: 'demo-user',
  },
  {
    id: 'sample-memo-2',
    title: '샘플 메모 2',
    content: '실제 백엔드 연동 시 이 자리에 사용자 메모가 표시됩니다.',
    location: {
      id: 'sample-place-2',
      latitude: 37.4979,
      longitude: 127.0276,
      name: '샘플 장소 2',
      address: '서울 강남구 강남대로 396 (강남역 인근)',
    },
    createdAt: '2025-01-02T10:00:00Z',
    updatedAt: '2025-01-02T10:00:00Z',
    memberId: 'demo-user',
  },
];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class MockMemoService implements MemoService {
  private memos: Memo[] = [...MOCK_MEMOS];

  async getMemos(): Promise<Memo[]> {
    await delay(200);
    return [...this.memos].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  async getMemoById(id: string): Promise<Memo | null> {
    await delay(100);
    return this.memos.find((m) => m.id === id) ?? null;
  }

  async createMemo(input: CreateMemoInput): Promise<Memo> {
    await delay(300);
    const now = new Date().toISOString();
    const memo: Memo = {
      id: `memo-${Date.now()}`,
      title: input.title,
      content: input.content,
      location: input.location,
      createdAt: now,
      updatedAt: now,
      memberId: 'demo-user',
    };
    this.memos.push(memo);
    return memo;
  }

  async updateMemo(id: string, input: UpdateMemoInput): Promise<Memo> {
    await delay(300);
    const index = this.memos.findIndex((m) => m.id === id);
    if (index === -1) throw new Error(`Memo not found: ${id}`);
    const updated: Memo = {
      ...this.memos[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };
    this.memos[index] = updated;
    return updated;
  }

  async deleteMemo(id: string): Promise<void> {
    await delay(200);
    this.memos = this.memos.filter((m) => m.id !== id);
  }
}
