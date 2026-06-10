// Platform-resolved module:
// - map-marker.native.tsx is used on iOS/Android
// - map-marker.web.tsx is used on Web
// This file serves as the TypeScript fallback for type checking.
export { MapMarker, DroppedPinMarker } from './map-marker.native';
