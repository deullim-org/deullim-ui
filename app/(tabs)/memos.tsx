import { useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useMemos } from '@/src/features/memo/hooks/use-memos';
import { MemoListItem } from '@/src/features/memo/components/memo-list-item';
import type { Memo } from '@/src/types/domain';

export default function MemosScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { memos, loading, loadMemos } = useMemos();

  const handleMemoPress = useCallback(
    (memo: Memo) => {
      router.push(`/memo/${memo.id}`);
    },
    [router],
  );

  const renderItem = useCallback(
    ({ item }: { item: Memo }) => <MemoListItem memo={item} onPress={handleMemoPress} />,
    [handleMemoPress],
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Memos</Text>
      </View>

      {loading && memos.length === 0 ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#0a7ea4" />
        </View>
      ) : memos.length === 0 ? (
        <View style={styles.centerContent}>
          <Ionicons name="document-text-outline" size={64} color="#ddd" />
          <Text style={styles.emptyTitle}>No memos yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap on the map to drop a pin and create your first memo
          </Text>
        </View>
      ) : (
        <FlatList
          data={memos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onRefresh={loadMemos}
          refreshing={loading}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#bbb',
    textAlign: 'center',
    lineHeight: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
});
