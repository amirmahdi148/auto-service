export type UserRole = "user" | "specialist";

export interface AuthUser {
    status: string;
    role: UserRole;
    name: string;
    username: string;
    phone: string;
    avatar: string;
}
