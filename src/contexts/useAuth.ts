import { createContext, useContext } from "react";
import type { AuthUser, UserRole } from "../types/auth.ts";

export interface AuthContextValue {
    user: AuthUser | null;
    isLoading: boolean;
    isError: boolean;
    role: UserRole | null;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = (): AuthContextValue => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
    return ctx;
};
