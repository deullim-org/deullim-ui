import { create } from 'zustand';
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  DEFAULT_ZOOM,
} from '@/src/constants/map';
import type { Location } from '@/src/types/domain';

interface CameraPosition {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface MapState {
  camera: CameraPosition;
  selectedLocation: Location | null;
  droppedPin: Location | null;
  isDetailSheetOpen: boolean;

  setCamera: (camera: CameraPosition) => void;
  moveCamera: (latitude: number, longitude: number, zoom?: number) => void;
  selectLocation: (location: Location) => void;
  dropPin: (latitude: number, longitude: number) => void;
  clearSelection: () => void;
  setDetailSheetOpen: (open: boolean) => void;
}

export const useMapStore = create<MapState>((set) => ({
  camera: {
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
    zoom: DEFAULT_ZOOM,
  },
  selectedLocation: null,
  droppedPin: null,
  isDetailSheetOpen: false,

  setCamera: (camera) => set({ camera }),

  moveCamera: (latitude, longitude, zoom) =>
    set((state) => ({
      camera: { latitude, longitude, zoom: zoom ?? state.camera.zoom },
    })),

  selectLocation: (location) =>
    set({ selectedLocation: location, isDetailSheetOpen: true }),

  dropPin: (latitude, longitude) =>
    set({
      droppedPin: {
        id: `pin-${Date.now()}`,
        latitude,
        longitude,
      },
      selectedLocation: {
        id: `pin-${Date.now()}`,
        latitude,
        longitude,
      },
      isDetailSheetOpen: true,
    }),

  clearSelection: () =>
    set({ selectedLocation: null, droppedPin: null, isDetailSheetOpen: false }),

  setDetailSheetOpen: (open) => set({ isDetailSheetOpen: open }),
}));
