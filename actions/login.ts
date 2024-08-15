const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const authenticateUser = async (name: string) => {
    try {
        const response = await fetch(
            `${apiUrl}user-http`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name })
            }
        );
        const token = await response.text();
        return token;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};