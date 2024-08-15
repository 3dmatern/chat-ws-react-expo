import { MessageDetailsModel } from "@/models/MessageModels";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const getAllMessages = async () => {
    try {
        const response = (await fetch(`${apiUrl}messages`));
        const result: { messages: MessageDetailsModel[] } = await response.json();
        return result.messages;
    } catch (error) {
        console.error("Error getting messages:", error);
        throw error;
    }
};