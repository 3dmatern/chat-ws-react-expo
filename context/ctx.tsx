import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";

import { useStorageState } from "@/hooks/useStorageState";
import { authenticateUser } from "@/actions/login";
import { UserDetailsModel } from "@/models/UserModel";

interface ParseToken extends UserDetailsModel {
    iat: number;
    exp: number;
};

const AuthContext = createContext<{
    signIn: (name: string) => void;
    signOut: () => void;
    session: string | null;
    user: ParseToken | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    user: null,
    isLoading: false
});

// Этот хук можно использовать для доступа к информации о пользователе.
export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== "production") {
        if (!value) {
            throw new Error('useSession должен быть завернут в <SessionProvider />');
        }
    }

    return value;
};

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState("session");
    const [currentUser, setCurrentUser] = useState<ParseToken | null>(null);

    useEffect(() => {
        if (session) {
            try {
                const decodedToken = jwtDecode<ParseToken>(session);
                setCurrentUser(decodedToken);
            } catch (error) {
                setCurrentUser(null);
            }
        }
    }, [session]);

    return (
        <AuthContext.Provider
            value={{
                signIn: async (name) => {
                    const token = await authenticateUser(name);
                    setSession(token);
                    router.push("/chat");
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                user: currentUser,
                isLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};