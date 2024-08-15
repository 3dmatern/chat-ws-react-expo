export async function authenticateUser(name: string) {
    try {
        const response = await fetch("http://localhost:3000/api/user-http", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name })
        });
        
        if (!response.ok) {
            throw new Error('Login failed');
        }
        const token = await response.text();
        return token;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};