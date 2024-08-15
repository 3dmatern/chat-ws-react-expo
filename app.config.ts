import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "Chat WS React Expo",
    slug: "chat-ws-react-expo",
    plugins: [
        "expo-secure-store"
    ]
});