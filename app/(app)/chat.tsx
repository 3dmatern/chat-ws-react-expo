import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useSession } from "@/context/ctx";
import { MessageDetailsModel } from "@/models/MessageModels";
import { getAllMessages } from "@/actions/messages";

import Button from "@/components/ui/Button";
import MessageCard from "@/components/MessageCard";
import MessageCardAuthor from "@/components/MessageCardAuthor";

export default function Chat() {
    let ws: WebSocket | undefined;
    const { user, signOut } = useSession();
    const [chatData, setChatData] = useState<{
        pingInterval: number | null;
        message: string;
        messages: MessageDetailsModel[]
        serverError: string;
    }>({
        pingInterval: null,
        message: "",
        messages: [],
        serverError: ""
    });

    const onStartPing = () => {};

    const onScroll = () => {};

    const handleMessage = () => {};

    const handleError = () => {};

    const handleClose = () => {};

    const handleClearMessages = () => {};
    
    const connectWS = async () => {
        const wsProtocol = process.env.EXPO_PUBLIC_WS;
        const host = process.env.EXPO_PUBLIC_HOST;
        const wsUrl = `${wsProtocol}://${host}/api/chat-ws?userId=${user?.id}&name=${user?.name}`;
        
        if (ws) {
            console.log("ws: Закрытие предыдущего соединения перед повторным подключением...");
            ws.removeEventListener("message", handleMessage);
            ws.removeEventListener("error", handleError);
            ws.removeEventListener("close", handleClose);
            ws.close();
            handleClearMessages();
        }

        console.log("ws: Подключаемся к ", wsUrl);
        ws = new WebSocket(wsUrl);

        ws.addEventListener("message", handleMessage);
        ws.addEventListener("error", handleError);
        ws.addEventListener("close", handleClose);

        await new Promise((resolve) => ws!.addEventListener("open", resolve));
        onStartPing();
        onScroll();
        console.log("ws: Подключились!");
    };

    useEffect(() => {
        const getMessages = async () => {
            const messages = await getAllMessages();
            setChatData(prev => ({ ...prev, messages }));
        };
        getMessages();
    }, [user?.id])

    return (
        <View style={styles.container}>
            <ScrollView style={styles.messagesContainer}>
                {chatData.messages.map((message) => (
                    user?.id === message.authorId ?
                        <MessageCardAuthor key={message.id} message={message} /> :
                        <MessageCard key={message.id} message={message} />
                ))}
            </ScrollView>
            <View>
                <Button label="Выход" onPressFunc={signOut} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        padding: 8,
        justifyContent: "space-between",
    },
    messagesContainer: {
        marginBottom: 4,
    }
});