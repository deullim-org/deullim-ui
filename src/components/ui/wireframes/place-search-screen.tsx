import { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { ThemedText } from '@/src/components/shared/themed-text';
import { ThemedView } from '@/src/components/shared/themed-view';

const DEFAULT_LOCATION = { latitude: 37.4979, longitude: 127.0276 }; // 강남역

const MOCK_PLACES = [
  {
    id: '1',
    name: '스타벅스 강남역점',
    category: '카페',
    distance: '350m',
    address: '서울 강남구 강남대로 396',
    rating: 4.2,
    latitude: 37.4985,
    longitude: 127.0265,
  },
  {
    id: '2',
    name: '블루보틀 삼성점',
    category: '카페',
    distance: '520m',
    address: '서울 강남구 테헤란로 521',
    rating: 4.5,
    latitude: 37.5012,
    longitude: 127.0398,
  },
  {
    id: '3',
    name: '할리스커피 역삼점',
    category: '카페',
    distance: '780m',
    address: '서울 강남구 테헤란로 152',
    rating: 4.0,
    latitude: 37.5001,
    longitude: 127.0365,
  },
  {
    id: '4',
    name: '이디야커피 선릉역점',
    category: '카페',
    distance: '1.2km',
    address: '서울 강남구 선릉로 433',
    rating: 3.8,
    latitude: 37.5045,
    longitude: 127.0489,
  },
  {
    id: '5',
    name: '투썸플레이스 대치점',
    category: '카페',
    distance: '1.5km',
    address: '서울 강남구 삼성로 212',
    rating: 4.1,
    latitude: 37.4945,
    longitude: 127.0612,
  },
];

export function PlaceSearchScreen() {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      }
    })();
  }, []);

  return (
    <ThemedView style={styles.container}>
        {/* Map Section (collapsed) */}
        <View style={styles.mapSection}>
          <MapView
            style={styles.map}
            region={{
              ...location,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >
            {/* Current Location Marker */}
            <Marker
              coordinate={location}
              title="현재 위치"
              pinColor="blue"
            />
            {/* Place Markers */}
            {MOCK_PLACES.map((place) => (
              <Marker
                key={place.id}
                coordinate={{ latitude: place.latitude, longitude: place.longitude }}
                title={place.name}
                description={`${place.category} · ${place.distance}`}
                pinColor={selectedPlace === place.id ? '#0a7ea4' : 'red'}
                onPress={() => setSelectedPlace(place.id)}
              />
            ))}
          </MapView>

          {/* Search Bar Overlay */}
          <View style={styles.searchBarContainer}>
            <View style={styles.searchBar}>
              <ThemedText style={styles.searchIcon}>🔍</ThemedText>
              <TextInput
                style={styles.searchInput}
                placeholder="장소 검색..."
                placeholderTextColor="#999"
                defaultValue="카페"
              />
              <TouchableOpacity style={styles.clearButton}>
                <ThemedText style={styles.clearIcon}>✕</ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Map Expand Button */}
          <TouchableOpacity style={styles.expandButton}>
            <ThemedText style={styles.expandIcon}>↕</ThemedText>
          </TouchableOpacity>
        </View>

        {/* List Section */}
        <View style={styles.listSection}>
          {/* Pull Handle */}
          <View style={styles.pullHandleContainer}>
            <View style={styles.pullHandle} />
          </View>

          {/* Results Header */}
          <View style={styles.resultsHeader}>
            <ThemedText type="defaultSemiBold">검색 결과</ThemedText>
            <ThemedText style={styles.resultCount}>5개의 장소</ThemedText>
          </View>

          {/* Filter Chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterContainer}
            contentContainerStyle={styles.filterContent}
          >
            <TouchableOpacity style={[styles.filterChip, styles.filterChipActive]}>
              <ThemedText style={styles.filterChipTextActive}>거리순</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <ThemedText style={styles.filterChipText}>평점순</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <ThemedText style={styles.filterChipText}>카페</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <ThemedText style={styles.filterChipText}>음식점</ThemedText>
            </TouchableOpacity>
          </ScrollView>

          {/* Place List */}
          <ScrollView style={styles.placeList} showsVerticalScrollIndicator={false}>
            {MOCK_PLACES.map((place) => (
              <TouchableOpacity
                key={place.id}
                style={[
                  styles.placeCard,
                  selectedPlace === place.id && styles.placeCardSelected,
                ]}
                onPress={() => setSelectedPlace(place.id)}
              >
                {/* Place Image Placeholder */}
                <View style={styles.placeImage}>
                  <ThemedText style={styles.placeImageText}>IMG</ThemedText>
                </View>

                {/* Place Info */}
                <View style={styles.placeInfo}>
                  <View style={styles.placeHeader}>
                    <ThemedText type="defaultSemiBold" numberOfLines={1}>
                      {place.name}
                    </ThemedText>
                    <View style={styles.distanceBadge}>
                      <ThemedText style={styles.distanceText}>{place.distance}</ThemedText>
                    </View>
                  </View>

                  <View style={styles.placeCategory}>
                    <ThemedText style={styles.categoryText}>{place.category}</ThemedText>
                    <ThemedText style={styles.ratingText}>★ {place.rating}</ThemedText>
                  </View>

                  <ThemedText style={styles.addressText} numberOfLines={1}>
                    {place.address}
                  </ThemedText>
                </View>

                {/* Action Button */}
                <TouchableOpacity style={styles.actionButton}>
                  <ThemedText style={styles.actionIcon}>→</ThemedText>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}

            {/* Bottom Spacing */}
            <View style={styles.bottomSpacing} />
          </ScrollView>
        </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapSection: {
    height: 200,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  searchBarContainer: {
    position: 'absolute',
    top: 8,
    left: 16,
    right: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  clearIcon: {
    color: '#999',
    fontSize: 14,
  },
  expandButton: {
    position: 'absolute',
    bottom: 12,
    right: 16,
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  expandIcon: {
    fontSize: 16,
  },
  listSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingTop: 8,
  },
  pullHandleContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  pullHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  resultCount: {
    color: '#666',
    fontSize: 14,
  },
  filterContainer: {
    maxHeight: 44,
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#0a7ea4',
  },
  filterChipText: {
    color: '#666',
    fontSize: 14,
  },
  filterChipTextActive: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  placeList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  placeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  placeCardSelected: {
    borderColor: '#0a7ea4',
    backgroundColor: '#F0F9FC',
  },
  placeImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  placeImageText: {
    color: '#CCC',
    fontSize: 12,
  },
  placeInfo: {
    flex: 1,
  },
  placeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  distanceBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#E8F4F8',
    borderRadius: 4,
  },
  distanceText: {
    fontSize: 12,
    color: '#0a7ea4',
    fontWeight: '500',
  },
  placeCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  categoryText: {
    fontSize: 13,
    color: '#666',
  },
  ratingText: {
    fontSize: 13,
    color: '#F5A623',
  },
  addressText: {
    fontSize: 12,
    color: '#999',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionIcon: {
    fontSize: 16,
    color: '#666',
  },
  bottomSpacing: {
    height: 40,
  },
});
