import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "Chat WS React Expo",
    slug: "chat-ws-react-expo",
    extra: {
      eas: {
        projectId: process.env.EXPO_PUBLIC_EXPO_DEV_PROJECT_ID
      }
    },
    android: {
        package: "store.dmatern.chatwsreactexpo"
    }
});