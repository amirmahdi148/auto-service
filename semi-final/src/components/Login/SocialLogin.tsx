import React from "react";
import { Globe, Info } from "lucide-react";

export const SocialLogin: React.FC = () => {
    return (
        <>
            {/* Modern Divider */}
            <div className="relative my-8 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-outline-variant/40"></div>
                </div>
                <span className="relative px-4 bg-white text-label-sm text-outline font-medium">ورود آسان از طریق</span>
            </div>

            {/* Easy/Social Logins */}
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    type="button"
                    className="flex-1 h-12 flex items-center justify-center gap-2 border border-outline-variant hover:border-primary hover:bg-primary-container/5 transition-all text-on-surface font-bold text-label-lg rounded-xl cursor-pointer group"
                >
                    <Globe className="size-5 text-outline group-hover:text-primary transition-colors" />
                    <span>ورود با حساب گوگل</span>
                </button>
                <button
                    type="button"
                    className="flex-1 h-12 flex items-center justify-center gap-2 border border-outline-variant hover:border-primary hover:bg-primary-container/5 transition-all text-on-surface font-bold text-label-lg rounded-xl cursor-pointer group"
                >
                    <Info className="size-5 text-outline group-hover:text-primary transition-colors" />
                    <span>رمز یکبار مصرف (SMS)</span>
                </button>
            </div>
        </>
    );
};
