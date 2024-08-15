import { MessageDetailsModel } from "@/models/MessageModels";
import { Image, StyleSheet, Text, View } from "react-native";

type MessageCardProps = {
    message: MessageDetailsModel;
};

export default function MessageCardAuthor({ message }: MessageCardProps) {

    return (
        <View
            style={[
               styles.container,
               {
                    backgroundColor: "#E7FBE6"
               }
            ]}
        >
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
    );
};

const styles = StyleSheet.create({
    container: {
        width: "fit-content",
        maxWidth: 250,
        marginLeft: "auto",
        marginBottom: 16,
        padding: 8,
        flexDirection: "column",
        gap: 4,
        borderRadius: 8
    },
    messageText: {
    },
    messageDate: {
        marginTop: 4,
        marginLeft: "auto",
        color: "#6b7280",
        fontSize: 12,
        lineHeight: 16
    }
});