import { type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { HttpService } from "../utils/HttpService.ts";
import {AuthContext, type AuthContextValue} from "./useAuth.ts";
import type { AuthUser } from "../types/auth.ts";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["auth", "me"],
        queryFn: () => HttpService.get<AuthUser>("/api/auth/me"),
        staleTime: 5 * 60 * 1000,
        retry: false,
    });

    const value: AuthContextValue = {
        user: data ?? null,
        isLoading,
        isError,
        role: data?.role ?? null,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
