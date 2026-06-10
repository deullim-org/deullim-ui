import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Memo } from '@/src/types/domain';

interface Props {
  memo: Memo;
  onPress: (memo: Memo) => void;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

export function MemoListItem({ memo, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(memo)} activeOpacity={0.7}>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {memo.title}
        </Text>
        <Text style={styles.preview} numberOfLines={2}>
          {memo.content}
        </Text>
        <View style={styles.meta}>
          <Ionicons name="location-outline" size={12} color="#aaa" />
          <Text style={styles.metaText} numberOfLines={1}>
            {memo.location.name ?? memo.location.address ?? 'Unknown location'}
          </Text>
          <Text style={styles.date}>{formatDate(memo.createdAt)}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#ccc" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  preview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#aaa',
    flex: 1,
  },
  date: {
    fontSize: 12,
    color: '#bbb',
  },
});
