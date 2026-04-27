import type { ConfigContext, ExpoConfig } from 'expo/config';

const PLACEHOLDER = 'YOUR_NAVER_MAP_CLIENT_ID';

export default ({ config }: ConfigContext): ExpoConfig => {
  const naverMapClientId = process.env.EXPO_PUBLIC_NAVER_MAP_CLIENT_ID || PLACEHOLDER;

  return {
    ...config,
    name: config.name ?? 'deullim-ui',
    slug: config.slug ?? 'deullim-ui',
    ios: {
      ...config.ios,
      infoPlist: {
        ...config.ios?.infoPlist,
        NMFClientId: naverMapClientId,
      },
    },
    plugins: (config.plugins ?? []).map((plugin) => {
      if (Array.isArray(plugin) && plugin[0] === '@mj-studio/react-native-naver-map') {
        const [name, options] = plugin as [string, Record<string, unknown>];
        return [name, { ...options, client_id: naverMapClientId }];
      }
      return plugin;
    }),
  };
};
