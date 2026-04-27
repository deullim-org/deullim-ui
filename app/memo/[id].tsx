import { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useMemos } from '@/src/features/memo/hooks/use-memos';
import { MemoForm } from '@/src/features/memo/components/memo-form';
import type { Memo } from '@/src/types/domain';
import { getService } from '@/src/services/service-registry';

export default function MemoDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { editMemo, deleteMemo, loading } = useMemos();
  const [memo, setMemo] = useState<Memo | null>(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!id) return;
    getService('memo')
      .getMemoById(id)
      .then((result) => setMemo(result))
      .finally(() => setFetchLoading(false));
  }, [id]);

  const handleEdit = useCallback(
    async (title: string, content: string) => {
      if (!id) return;
      const updated = await editMemo(id, title, content);
      if (updated) {
        setMemo(updated);
        setEditing(false);
      }
    },
    [id, editMemo],
  );

  const handleDelete = useCallback(() => {
    if (!id) return;
    Alert.alert('Delete Memo', 'Are you sure you want to delete this memo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteMemo(id);
          router.back();
        },
      },
    ]);
  }, [id, deleteMemo, router]);

  if (fetchLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0a7ea4" />
      </View>
    );
  }

  if (!memo) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle-outline" size={48} color="#ccc" />
        <Text style={styles.notFoundText}>Memo not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (editing) {
    return (
      <MemoForm
        initialTitle={memo.title}
        initialContent={memo.content}
        locationName={memo.location.name}
        locationAddress={memo.location.address}
        loading={loading}
        onSubmit={handleEdit}
        onCancel={() => setEditing(false)}
        submitLabel="Update"
      />
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{memo.title}</Text>

        <View style={styles.locationRow}>
          <Ionicons name="location-sharp" size={16} color="#E53E3E" />
          <Text style={styles.locationText}>
            {memo.location.name ?? memo.location.address ?? 'Unknown'}
          </Text>
        </View>

        <Text style={styles.date}>
          Created {new Date(memo.createdAt).toLocaleDateString('ko-KR')}
          {memo.updatedAt !== memo.createdAt &&
            ` · Updated ${new Date(memo.updatedAt).toLocaleDateString('ko-KR')}`}
        </Text>

        <Text style={styles.content}>{memo.content}</Text>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
          <Ionicons name="create-outline" size={20} color="#0a7ea4" />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={20} color="#E53E3E" />
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#fff',
  },
  notFoundText: {
    fontSize: 16,
    color: '#999',
  },
  backLink: {
    fontSize: 16,
    color: '#0a7ea4',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 13,
    color: '#aaa',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    color: '#333',
    lineHeight: 26,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#f0f7fa',
  },
  editText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0a7ea4',
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#fef2f2',
  },
  deleteText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E53E3E',
  },
});
