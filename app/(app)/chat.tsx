import { useEffect, useRef, useState } from "react";
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
    const ws = useRef<WebSocket | null>(null);
    const scrollViewRef = useRef<ScrollView | null>(null);

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

    useEffect(() => {
        const wsProtocol = process.env.EXPO_PUBLIC_WS;
        const host = process.env.EXPO_PUBLIC_HOST;
        const socketUrl = `${wsProtocol}://${host}/api/chat-ws?userId=${user?.id}&name=${user?.name}`;

        ws.current = new WebSocket(socketUrl);
        ws.current.onopen = () => {
            console.log("WebSocket соединение установлено");
            onStartPing();
        };

        ws.current.onmessage = handleMessage;
        ws.current.onerror = handleError;
        ws.current.onclose = handleClose;


        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    useEffect(() => {
        const getMessages = async () => {
            const messages = await getAllMessages();
            setChatData(prev => ({ ...prev, messages }));
        };
        getMessages();
        onScrollViewComponent();
    }, [user?.id]);

    const handleChangeMessage = (message: string) => {
        setChatData(prev => ({ ...prev, message }));
    };

    const createMessageJSON = (text: string) => {
        return JSON.stringify({
            authorId: user?.id,
            text,
            created_at: new Date().toLocaleString(),
        });
    };

    const sendMessage = () => {
        const trimMessage = chatData.message.trim();
        if (ws.current && trimMessage) {
            const messageJSON = createMessageJSON(trimMessage);
            ws.current.send(messageJSON);
            setChatData(prev => ({ ...prev, message: "" }));
        }
    };

    const onScrollViewComponent = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };

    const onStartPing = () => {
        if (chatData.pingInterval) {
            clearInterval(chatData.pingInterval);
        }
        chatData.pingInterval = setInterval(() => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.send(createMessageJSON("ping"));
            }
        }, 30000);
    };

    const handleMessage = (event: MessageEvent) => {
        const res: WSResponseModel = JSON.parse(event.data);
        if (res.type === "error") {
            setChatData(prev => ({ ...prev, serverError: res.message.toString() }));
        } else if (res.type === "success") {
            setChatData(prev => ({ ...prev, messages: [...prev.messages, res.message] }));
            onScrollViewComponent();
        } else if (res.type === "new_message") {
            setChatData(prev => ({ ...prev, messages: [...prev.messages, res.message] }));
            onScrollViewComponent();
        } else if (res.type === "pong") {
            console.log("Получен pong от сервера");
        }
    };

    const handleError = (event: Event) => {
        console.error("WebSocket ошибка:", event);
    };

    const handleClose = (event: CloseEvent) => {
        console.log("WebSocket соединение закрыто:", event);
        clearInterval(chatData.pingInterval);
    };

    const handleLogout = () => {
        signOut();
    };

    return (
        <View style={styles.container}>
            <ScrollView ref={scrollViewRef} style={styles.messagesContainer}>
                {chatData.messages.map((message) => (
                    user?.id === message.authorId ?
                        <MessageCardAuthor key={message.id} message={message} /> :
                        <MessageCard key={message.id} message={message} />
                ))}
            </ScrollView>

            <View style={styles.chatContainer}>
                <Input value={chatData.message} onChangeText={handleChangeMessage} />

                <Button
                    style={{
                        width: "fit-content",
                        justifyContent: "center"
                    }}
                    onPressFunc={sendMessage}
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
                    onPressFunc={handleLogout}
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
        gap: 4,
        backgroundColor: "#F2F1EB"
    }
});