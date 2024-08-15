import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useSession } from "@/context/ctx";
import { MessageDetailsModel } from "@/models/MessageModels";
import { getAllMessages } from "@/actions/messages";

import MessageCard from "@/components/MessageCard";
import MessageCardAuthor from "@/components/MessageCardAuthor";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { WSResponseModel } from "@/models/WSResponseModel";

export default function Chat() {
    let ws: WebSocket | undefined;
    const { user, signOut } = useSession();
    const [chatData, setChatData] = useState<{
        pingInterval: any;
        message: string;
        messages: MessageDetailsModel[]
        serverError: string;
    }>({
        pingInterval: null,
        message: "",
        messages: [],
        serverError: ""
    });

    const handleChangeMessage = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const message = target.value;
        setChatData(prev => ({ ...prev, message }));
    };

    const createMessageJSON = (text: string) => {
        return JSON.stringify({
            authorId: user?.id,
            text,
            created_at: new Date().toLocaleString(),
        });
    };

    const onStartPing = () => {
        if (chatData.pingInterval) {
            clearInterval(chatData.pingInterval);
        }
        chatData.pingInterval = setInterval(() => {
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(createMessageJSON("ping"));
            }
        }, 30000);
    };

    const onScroll = () => {
        console.log("Скроллим");
        scrollTo(0, document.body.scrollHeight + 56)
    };

    const handleClearMessages = () => {
        setChatData(prev => ({ ...prev, messages: [] }))
    };

    const handleMessage = (event: MessageEvent) => {
        const res: WSResponseModel = JSON.parse(event.data);
        if (res.type === "error") {
            setChatData(prev => ({ ...prev, serverError: res.message.toString() }));
        } else if (res.type === "success") {
            setChatData(prev => ({ ...prev, messages: [...prev.messages, res.message] }));
        } else if (res.type === "new_message") {
            setChatData(prev => ({ ...prev, messages: [...prev.messages, res.message] }));
        } else if (res.type === "pong") {
            console.log("Получен pong от сервера");
        }
        onScroll();
    };

    const handleError = () => {
        console.error("WebSocket ошибка:", event);
    };

    const handleClose = () => {
        console.log("WebSocket соединение закрыто:", event);
        // Переустановите WebSocket соединение при необходимости
        connectWS();
    };
    
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
    }, [user?.id]);

    const handleSend = () => {
        console.log("Отправка сообщения...");
        if (chatData.message) {
            if (ws && ws.readyState === WebSocket.OPEN) {
                const newMessage = createMessageJSON(chatData.message);
                ws!.send(newMessage);
                console.log("Сообщение отправлено!");
            } else {
                console.warn("WebSocket не открыт. ReadyState:", ws?.readyState);
            }
        }
        setChatData(prev => ({ ...prev, message: "" }));
    };

    useEffect(() => {
        connectWS();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.messagesContainer}>
                {chatData.messages.map((message) => (
                    user?.id === message.authorId ?
                        <MessageCardAuthor key={message.id} message={message} /> :
                        <MessageCard key={message.id} message={message} />
                ))}
            </ScrollView>

            <View style={styles.chatContainer}>
                <Input onChange={handleChangeMessage} />

                <Button
                    style={{
                        width: "fit-content",
                        justifyContent: "center"
                    }}
                    onPressFunc={handleSend}
                >
                    <Ionicons name="send" size={22} color="#fff"/>
                </Button>

                <Button
                    style={{
                        width: "fit-content",
                        justifyContent: "center"
                    }}
                    styleButton={{
                        backgroundColor: "#FF0000"
                    }}
                    onPressFunc={signOut}
                >
                    <Ionicons name="log-out-outline" size={22} color="#fff"/>
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        justifyContent: "space-between",
    },
    messagesContainer: {
        marginBottom: 4,
        padding: 8,
    },
    chatContainer: {
        padding: 8,
        flexDirection: "row",
        gap: 4,
        backgroundColor: "#F2F1EB"
    }
});