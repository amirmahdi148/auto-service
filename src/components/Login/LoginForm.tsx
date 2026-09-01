import React, { useState, useRef, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import {HttpService} from "../../utils/HttpService.ts";

interface LoginFormProps {
    onSuccess: (message: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
    const [loginIdentifier, setLoginIdentifier] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!loginIdentifier.trim()) {
            newErrors.loginIdentifier = "لطفاً ایمیل یا شماره موبایل خود را وارد کنید.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginIdentifier) && 
            !/^(09\d{9})$/.test(loginIdentifier)
        ) {
            newErrors.loginIdentifier = "ایمیل یا شماره موبایل معتبر نیست (مثال موبایل: 09123456789).";
        }
        
        if (!loginPassword) {
            newErrors.loginPassword = "لطفاً رمز عبور خود را وارد کنید.";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});

        try {
            await HttpService.post("/api/login", {
                body: { email: loginIdentifier, password: loginPassword },
            });
            if (isMounted.current) {
                setIsLoading(false);
                onSuccess("ورود شما با موفقیت انجام شد. به اتو پلاس خوش آمدید!");
            }
        } catch {
            if (isMounted.current) {
                setIsLoading(false);
                setErrors({ loginPassword: "ایمیل یا رمز عبور نادرست است." });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email / Phone Field */}
            <div className="space-y-2">
                <label 
                    htmlFor="loginIdentifier"
                    className="block text-label-lg font-bold text-on-surface text-right"
                >
                    ایمیل یا شماره موبایل
                </label>
                <div className="relative">
                    <input
                        id="loginIdentifier"
                        type="text"
                        dir="ltr"
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        onFocus={() => setFocusedField("loginIdentifier")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-12 px-4 pr-11 rounded-xl bg-white border text-on-surface placeholder:text-outline/50 focus:outline-none transition-all duration-300 ${
                            errors.loginIdentifier 
                                ? "border-error focus:ring-1 focus:ring-error" 
                                : focusedField === "loginIdentifier"
                                    ? "border-2 border-primary shadow-[0_0_12px_rgba(0,37,68,0.1)]"
                                    : "border-outline-variant hover:border-outline"
                        }`}
                        placeholder="info@autoplus.ir یا 09123456789"
                    />
                    <div className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === "loginIdentifier" ? "text-primary" : "text-outline"
                    }`}>
                        <Mail className="size-5" />
                    </div>
                </div>
                {errors.loginIdentifier && (
                    <p className="flex items-center gap-1.5 text-label-sm text-error font-medium">
                        <AlertCircle className="size-4 shrink-0" />
                        <span>{errors.loginIdentifier}</span>
                    </p>
                )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <label 
                        htmlFor="loginPassword"
                        className="text-label-lg font-bold text-on-surface text-right"
                    >
                        رمز عبور
                    </label>
                    <a href="#" className="text-label-sm text-secondary font-bold hover:underline">
                        فراموشی رمز عبور؟
                    </a>
                </div>
                <div className="relative">
                    <input
                        id="loginPassword"
                        type={showPassword ? "text" : "password"}
                        dir="ltr"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        onFocus={() => setFocusedField("loginPassword")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-12 px-10 pr-11 rounded-xl bg-white border text-on-surface placeholder:text-outline/50 focus:outline-none transition-all duration-300 ${
                            errors.loginPassword 
                                ? "border-error focus:ring-1 focus:ring-error" 
                                : focusedField === "loginPassword"
                                    ? "border-2 border-primary shadow-[0_0_12px_rgba(0,37,68,0.1)]"
                                    : "border-outline-variant hover:border-outline"
                        }`}
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors cursor-pointer"
                    >
                        {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                    <div className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === "loginPassword" ? "text-primary" : "text-outline"
                    }`}>
                        <Lock className="size-5" />
                    </div>
                </div>
                {errors.loginPassword && (
                    <p className="flex items-center gap-1.5 text-label-sm text-error font-medium">
                        <AlertCircle className="size-4 shrink-0" />
                        <span>{errors.loginPassword}</span>
                    </p>
                )}
            </div>

            {/* Remember Me checkbox positioned to the right of label in RTL */}
            <div className="flex items-center justify-start select-none">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                        type="checkbox" 
                        className="size-4.5 rounded-xl border-outline-variant text-primary focus:ring-primary accent-primary cursor-pointer transition-colors" 
                    />
                    <span className="text-label-sm text-on-surface-variant group-hover:text-primary transition-colors">مرا به خاطر بسپار</span>
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container font-bold text-label-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98] cursor-pointer disabled:opacity-50"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="size-5 animate-spin" />
                        <span>در حال ورود به سیستم...</span>
                    </>
                ) : (
                    <>
                        <span>ورود به حساب کاربری</span>
                        <ArrowLeft className="size-5 shrink-0" />
                    </>
                )}
            </button>
        </form>
    );
};
