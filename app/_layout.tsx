import { Slot } from "expo-router";
import { SessionProvider } from "@/context/ctx";

export default function Root() {
    // Настраиваем контекст аутентификации и визуализируем внутри него наш макет.
    return (
        <SessionProvider>
            <Slot />
        </SessionProvider>
    );
};