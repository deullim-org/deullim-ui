import { useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useMapStore } from '../store/map-store';
import { useMemoStore } from '@/src/features/memo/store/memo-store';
import { useReverseGeocode } from './use-reverse-geocode';

export function LocationDetailSheet() {
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%', '55%'], []);

  const { selectedLocation, isDetailSheetOpen, clearSelection } = useMapStore();
  const memos = useMemoStore((s) => s.memos);

  const { address, loading: addressLoading } = useReverseGeocode(
    selectedLocation?.latitude,
    selectedLocation?.longitude,
  );

  const locationMemos = useMemo(() => {
    if (!selectedLocation) return [];
    return memos.filter((m) => m.location.id === selectedLocation.id);
  }, [selectedLocation, memos]);

  useEffect(() => {
    if (isDetailSheetOpen && selectedLocation) {
      // Small delay to ensure BottomSheet is mounted
      const timer = setTimeout(() => {
        bottomSheetRef.current?.snapToIndex(0);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isDetailSheetOpen, selectedLocation]);

  const handleSheetChange = useCallback(
    (index: number) => {
      if (index === -1) {
        clearSelection();
      }
    },
    [clearSelection],
  );

  const handleCreateMemo = useCallback(() => {
    if (!selectedLocation) return;
    router.push({
      pathname: '/memo/create',
      params: {
        latitude: selectedLocation.latitude.toString(),
        longitude: selectedLocation.longitude.toString(),
        name: selectedLocation.name ?? '',
        address: address ?? '',
        locationId: selectedLocation.id,
      },
    });
  }, [router, selectedLocation, address]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      enablePanDownToClose
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.indicator}
    >
      <BottomSheetView style={styles.content}>
        {selectedLocation ? (
          <>
            <View style={styles.header}>
              <View style={styles.titleRow}>
                <Ionicons name="location-sharp" size={20} color="#E53E3E" />
                <Text style={styles.title} numberOfLines={1}>
                  {selectedLocation.name || 'Selected Location'}
                </Text>
              </View>
              {addressLoading ? (
                <ActivityIndicator size="small" style={styles.addressLoader} />
              ) : (
                <Text style={styles.address} numberOfLines={2}>
                  {address ||
                    `${selectedLocation.latitude.toFixed(4)}, ${selectedLocation.longitude.toFixed(4)}`}
                </Text>
              )}
            </View>

            {locationMemos.length > 0 && (
              <View style={styles.memosSection}>
                <Text style={styles.sectionTitle}>Memos at this location</Text>
                {locationMemos.map((memo) => (
                  <TouchableOpacity
                    key={memo.id}
                    style={styles.memoItem}
                    onPress={() => router.push(`/memo/${memo.id}`)}
                  >
                    <Text style={styles.memoTitle}>{memo.title}</Text>
                    <Text style={styles.memoPreview} numberOfLines={1}>
                      {memo.content}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <TouchableOpacity style={styles.createButton} onPress={handleCreateMemo}>
              <Ionicons name="create-outline" size={20} color="#fff" />
              <Text style={styles.createButtonText}>Write a memo here</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.emptyContent}>
            <Text style={styles.emptyText}>Tap on the map to select a location</Text>
          </View>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  indicator: {
    backgroundColor: '#ccc',
    width: 40,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyContent: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
  },
  header: {
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    flex: 1,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginLeft: 28,
  },
  addressLoader: {
    alignSelf: 'flex-start',
    marginLeft: 28,
  },
  memosSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8,
  },
  memoItem: {
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  memoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  memoPreview: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#0a7ea4',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
