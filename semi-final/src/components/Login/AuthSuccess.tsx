import React from "react";
import { CheckCircle2 } from "lucide-react";

interface AuthSuccessProps {
    registerName?: string;
    successMessage: string;
}

export const AuthSuccess: React.FC<AuthSuccessProps> = ({ registerName, successMessage }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-6 py-12 animate-fade-in">
            <div className="size-20 bg-primary/5 text-primary rounded-full flex items-center justify-center shadow-lg border border-primary/10 relative">
                <CheckCircle2 className="size-12 text-primary" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                </span>
            </div>
            <div className="space-y-2">
                <h3 className="text-headline-lg font-black text-primary">خوش آمدید!</h3>
                <p className="text-body-lg font-bold text-on-surface-variant max-w-sm">
                    {registerName ? `سلام ${registerName} عزیز!` : ""}
                </p>
                <p className="text-body-md text-on-surface-variant/80 max-w-sm px-4">
                    {successMessage}
                </p>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-1/2 animate-shimmer rounded-full" />
            </div>
        </div>
    );
};
