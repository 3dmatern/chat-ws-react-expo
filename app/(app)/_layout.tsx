import { Text } from "react-native";

import { useSession } from "@/context/ctx";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
    const { session, isLoading } = useSession();

    // Вы можете оставить заставку открытой или отрисовать экран загрузки,
    // как мы делаем здесь.
    if (isLoading) {
        return <Text>Загрузка...</Text>;
    }

    // Требовать аутентификацию только в макете группы (приложение) в качестве пользователей
    // необходимо иметь доступ к группе (auth) и снова войти в систему.
    if (!session) {
        // В Интернете статический рендеринг будет остановлен здесь, поскольку пользователь
        // не аутентифицирован в безголовом процессе Node, в котором отображаются страницы.
        return <Redirect href="/" />;
    }

    // Этот макет можно отложить, поскольку он не является корневым макетом.
    return <Stack screenOptions={{contentStyle: {backgroundColor: "#fff"}}} />;
};