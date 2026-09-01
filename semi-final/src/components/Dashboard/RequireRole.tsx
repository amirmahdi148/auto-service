import { type ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../contexts/useAuth.ts";
import type { UserRole } from "../../types/auth.ts";
import { FullPageLoader } from "./FullPageLoader.tsx";

interface RequireRoleProps {
    role: UserRole;
    children: ReactNode;
}

export const RequireRole = ({ role, children }: RequireRoleProps) => {
    const { user, isLoading, isError } = useAuth();

    if (isLoading) return <FullPageLoader />;
    if (isError || !user) return <Navigate to="/login" replace />;
    if (user.role !== role) return <Navigate to="/dashboard/overview" replace />;

    return <>{children}</>;
};
