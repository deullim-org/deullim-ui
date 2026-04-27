// Platform-resolved module:
// - naver-map-view.native.tsx is used on iOS/Android
// - naver-map-view.web.tsx is used on Web
// This file serves as the TypeScript fallback for type checking.
export { NaverMap, type NaverMapHandle } from './naver-map-view.native';
