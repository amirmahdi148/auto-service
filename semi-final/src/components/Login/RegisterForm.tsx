import React, { useState, useMemo, useRef, useEffect } from "react";
import { User, Phone, Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, ArrowLeft } from "lucide-react";

interface RegisterFormProps {
    onSuccess: (name: string, message: string) => void;
    registerName: string;
    setRegisterName: React.Dispatch<React.SetStateAction<string>>;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, registerName, setRegisterName }) => {
    const [registerPhone, setRegisterPhone] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerAgree, setRegisterAgree] = useState(false);
    
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

    // Calculate password strength
    const { passwordStrength, passwordFeedback } = useMemo(() => {
        if (!registerPassword) return { passwordStrength: 0, passwordFeedback: "" };
        let score = 0;
        if (registerPassword.length >= 6) score += 1;
        if (registerPassword.length >= 10) score += 1;
        if (/[A-Z]/.test(registerPassword) || /[a-z]/.test(registerPassword)) score += 1;
        if (/[0-9]/.test(registerPassword)) score += 1;
        if (/[^A-Za-z0-9]/.test(registerPassword)) score += 1;

        const feedback = score <= 2 ? "ضعیف ⛔" : score <= 4 ? "متوسط ⚠️" : "بسیار قوی 🔥";

        return { passwordStrength: score, passwordFeedback: feedback };
    }, [registerPassword]);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!registerName.trim()) {
            newErrors.registerName = "لطفاً نام و نام خانوادگی خود را وارد کنید.";
        }
        
        if (!registerPhone.trim()) {
            newErrors.registerPhone = "لطفاً شماره موبایل خود را وارد کنید.";
        } else if (!/^(09\d{9})$/.test(registerPhone)) {
            newErrors.registerPhone = "شماره موبایل باید معتبر باشد (مثال: 09123456789).";
        }
        
        if (registerEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmail)) {
            newErrors.registerEmail = "فرمت ایمیل معتبر نیست.";
        }
        
        if (!registerPassword) {
            newErrors.registerPassword = "لطفاً رمز عبور خود را تعیین کنید.";
        } else if (registerPassword.length < 6) {
            newErrors.registerPassword = "رمز عبور باید حداقل ۶ کاراکتر باشد.";
        }
        
        if (!registerAgree) {
            newErrors.registerAgree = "تایید قوانین و مقررات الزامی است.";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setIsLoading(true);
        setErrors({});
        
        // Simulating API call for registration
        setTimeout(() => {
            if (isMounted.current) {
                setIsLoading(false);
                onSuccess(registerName, "حساب کاربری شما ساخته شد. آماده استفاده از خدمات ویژه هستید!");
            }
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
                <label 
                    htmlFor="registerName"
                    className="block text-label-lg font-bold text-on-surface text-right"
                >
                    نام و نام خانوادگی
                </label>
                <div className="relative">
                    <input
                        id="registerName"
                        type="text"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        onFocus={() => setFocusedField("registerName")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-11 px-4 pr-11 rounded-xl bg-white border text-on-surface placeholder:text-outline/50 focus:outline-none transition-all duration-300 ${
                            errors.registerName 
                                ? "border-error focus:ring-1 focus:ring-error" 
                                : focusedField === "registerName"
                                    ? "border-2 border-primary shadow-[0_0_12px_rgba(0,37,68,0.1)]"
                                    : "border-outline-variant hover:border-outline"
                        }`}
                        placeholder="مثال: رضا محمدی"
                    />
                    <div className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === "registerName" ? "text-primary" : "text-outline"
                    }`}>
                        <User className="size-5" />
                    </div>
                </div>
                {errors.registerName && (
                    <p className="flex items-center gap-1.5 text-label-sm text-error font-medium">
                        <AlertCircle className="size-4 shrink-0" />
                        <span>{errors.registerName}</span>
                    </p>
                )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
                <label 
                    htmlFor="registerPhone"
                    className="block text-label-lg font-bold text-on-surface text-right"
                >
                    شماره موبایل
                </label>
                <div className="relative">
                    <input
                        id="registerPhone"
                        type="text"
                        dir="ltr"
                        value={registerPhone}
                        onChange={(e) => setRegisterPhone(e.target.value)}
                        onFocus={() => setFocusedField("registerPhone")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-11 px-4 pr-11 rounded-xl bg-white border text-on-surface placeholder:text-outline/50 focus:outline-none transition-all duration-300 ${
                            errors.registerPhone 
                                ? "border-error focus:ring-1 focus:ring-error" 
                                : focusedField === "registerPhone"
                                    ? "border-2 border-primary shadow-[0_0_12px_rgba(0,37,68,0.1)]"
                                    : "border-outline-variant hover:border-outline"
                        }`}
                        placeholder="09123456789"
                    />
                    <div className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === "registerPhone" ? "text-primary" : "text-outline"
                    }`}>
                        <Phone className="size-5" />
                    </div>
                </div>
                {errors.registerPhone && (
                    <p className="flex items-center gap-1.5 text-label-sm text-error font-medium">
                        <AlertCircle className="size-4 shrink-0" />
                        <span>{errors.registerPhone}</span>
                    </p>
                )}
            </div>

            {/* Email */}
            <div className="space-y-2">
                <label 
                    htmlFor="registerEmail"
                    className="block text-label-lg font-bold text-on-surface text-right"
                >
                    ایمیل (اختیاری)
                </label>
                <div className="relative">
                    <input
                        id="registerEmail"
                        type="text"
                        dir="ltr"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        onFocus={() => setFocusedField("registerEmail")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-11 px-4 pr-11 rounded-xl bg-white border text-on-surface placeholder:text-outline/50 focus:outline-none transition-all duration-300 ${
                            errors.registerEmail 
                                ? "border-error focus:ring-1 focus:ring-error" 
                                : focusedField === "registerEmail"
                                    ? "border-2 border-primary shadow-[0_0_12px_rgba(0,37,68,0.1)]"
                                    : "border-outline-variant hover:border-outline"
                        }`}
                        placeholder="info@example.com"
                    />
                    <div className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === "registerEmail" ? "text-primary" : "text-outline"
                    }`}>
                        <Mail className="size-5" />
                    </div>
                </div>
                {errors.registerEmail && (
                    <p className="flex items-center gap-1.5 text-label-sm text-error font-medium">
                        <AlertCircle className="size-4 shrink-0" />
                        <span>{errors.registerEmail}</span>
                    </p>
                )}
            </div>

            {/* Password & Strength Meter */}
            <div className="space-y-2">
                <label 
                    htmlFor="registerPassword"
                    className="block text-label-lg font-bold text-on-surface text-right"
                >
                    رمز عبور
                </label>
                <div className="relative">
                    <input
                        id="registerPassword"
                        type={showPassword ? "text" : "password"}
                        dir="ltr"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        onFocus={() => setFocusedField("registerPassword")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-11 px-10 pr-11 rounded-xl bg-white border text-on-surface placeholder:text-outline/50 focus:outline-none transition-all duration-300 ${
                            errors.registerPassword 
                                ? "border-error focus:ring-1 focus:ring-error" 
                                : focusedField === "registerPassword"
                                    ? "border-2 border-primary shadow-[0_0_12px_rgba(0,37,68,0.1)]"
                                    : "border-outline-variant hover:border-outline"
                        }`}
                        placeholder="حداقل ۶ کاراکتر"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors cursor-pointer"
                    >
                        {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                    <div className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === "registerPassword" ? "text-primary" : "text-outline"
                    }`}>
                        <Lock className="size-5" />
                    </div>
                </div>

                {/* Dynamic Password Strength Visualizer */}
                {registerPassword && (
                    <div className="space-y-1.5 pt-1.5">
                        <div className="flex justify-between items-center text-label-sm">
                            <span className="text-on-surface-variant font-medium">امنیت رمز عبور:</span>
                            <span className={`font-bold transition-all duration-300 ${
                                passwordStrength <= 2 ? "text-error" : passwordStrength <= 4 ? "text-amber-500" : "text-emerald-500"
                            }`}>
                                {passwordFeedback}
                            </span>
                        </div>
                        <div className="flex gap-1 h-1.5 w-full bg-surface-container-low rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-500 ${
                                    passwordStrength <= 2 
                                        ? "bg-error" 
                                        : passwordStrength <= 4 
                                            ? "bg-amber-500" 
                                            : "bg-emerald-500"
                                }`}
                                style={{ width: `${(passwordStrength / 5) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                {errors.registerPassword && (
                    <p className="flex items-center gap-1.5 text-label-sm text-error font-medium">
                        <AlertCircle className="size-4 shrink-0" />
                        <span>{errors.registerPassword}</span>
                    </p>
                )}
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-2 pt-2">
                <div className="flex items-center justify-start select-none">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            checked={registerAgree}
                            onChange={(e) => setRegisterAgree(e.target.checked)}
                            className="size-4.5 rounded-xl border-outline-variant text-primary focus:ring-primary accent-primary cursor-pointer transition-colors" 
                        />
                        <span className="text-label-sm text-on-surface-variant group-hover:text-primary transition-colors">
                            شرایط و <a href="#" className="text-secondary font-bold hover:underline">قوانین اتو پلاس</a> را می‌پذیرم.
                        </span>
                    </label>
                </div>
                {errors.registerAgree && (
                    <p className="flex items-center gap-1.5 text-label-sm text-error font-medium">
                        <AlertCircle className="size-4 shrink-0" />
                        <span>{errors.registerAgree}</span>
                    </p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container font-bold text-label-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98] cursor-pointer disabled:opacity-50"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="size-5 animate-spin" />
                        <span>در حال ثبت اطلاعات...</span>
                    </>
                ) : (
                    <>
                        <span>ایجاد حساب کاربری</span>
                        <ArrowLeft className="size-5 shrink-0" />
                    </>
                )}
            </button>
        </form>
    );
};
