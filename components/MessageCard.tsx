import { MessageDetailsModel } from "@/models/MessageModels";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

type MessageCardProps = {
    message: MessageDetailsModel;
};

export default function MessageCard({ message }: MessageCardProps) {

    return (
        <View style={styles.container}>
            <Image
                style={styles.authorAvatar}
                source={`https://www.gravatar.com/avatar/${encodeURIComponent(message.authorId)}?s=512&d=monsterid`}
                alt="Avatar"
            />

            <View
                style={[
                    styles.messageContainer,
                    {
                        backgroundColor: "#F1F1F1"
                    }
                ]}
            >
                <Text
                    style={[
                        styles.authorName,
                        {
                            color: "#3FA2F6"
                        }
                    ]}
                >
                    {message.author.name}
                </Text>
                <Text
                    style={[
                        styles.messageText,
                        {
                        }
                    ]}
                >
                    {message.text}
                </Text>
                <Text style={styles.messageDate}>
                    {message.created_at}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "fit-content",
        maxWidth: 250,
        marginLeft: 0,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 8,
    },
    authorAvatar: {
        width: 32,
        height: 32,
        borderRadius: 50,
    },
    messageContainer: {
        padding: 8,
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 4,
        borderRadius: 8,
    },
    authorName: {
    },
    messageText: {
    },
    messageDate: {
        marginTop: 4,
        marginLeft: 40,
        color: "#6b7280",
        fontSize: 12,
        lineHeight: 16
    }
});