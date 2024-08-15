export const authenticateUser = async (name: string) => {
    try {
        const response = await fetch(
            "http://192.168.0.103:3000/api/user-http",
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