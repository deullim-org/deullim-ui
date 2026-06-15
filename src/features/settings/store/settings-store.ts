import { create } from 'zustand';
import { DEFAULT_RADIUS_M } from '@/src/constants/notification';

interface SettingsState {
  notificationsEnabled: boolean;
  notificationRadiusMeters: number;

  setNotificationsEnabled: (enabled: boolean) => void;
  setNotificationRadius: (meters: number) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  notificationsEnabled: true,
  notificationRadiusMeters: DEFAULT_RADIUS_M,

  setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
  setNotificationRadius: (meters) => set({ notificationRadiusMeters: meters }),
}));
