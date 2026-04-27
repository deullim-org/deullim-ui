import type { Memo, Location } from '@/src/types/domain';

export interface CreateMemoInput {
  title: string;
  content: string;
  location: Location;
}

export interface UpdateMemoInput {
  title?: string;
  content?: string;
}

export interface MemoService {
  getMemos(): Promise<Memo[]>;
  getMemoById(id: string): Promise<Memo | null>;
  createMemo(input: CreateMemoInput): Promise<Memo>;
  updateMemo(id: string, input: UpdateMemoInput): Promise<Memo>;
  deleteMemo(id: string): Promise<void>;
}
