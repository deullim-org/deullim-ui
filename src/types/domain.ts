export interface Location {
  id: string;
  latitude: number;
  longitude: number;
  address?: string;
  name?: string;
}

export interface Place {
  id: string;
  name: string;
  address: string;
  category?: string;
  latitude: number;
  longitude: number;
}

export interface Memo {
  id: string;
  title: string;
  content: string;
  location: Location;
  createdAt: string;
  updatedAt: string;
  memberId: string;
}

export interface Member {
  id: string;
  nickname: string;
  email: string;
}

export interface Setting {
  notificationsEnabled: boolean;
  // Radius in meters for receiving nearby-memo push notifications.
  notificationRadiusMeters: number;
}
