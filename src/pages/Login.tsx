import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { 
    Eye, 
    EyeOff, 
    Mail, 
    Lock, 
    User, 
    Phone, 
    ArrowLeft, 
    AlertCircle, 
    CheckCircle2, 
    Loader2,
    ShieldCheck,
    Globe,
    Sparkles,
    Cpu,
    Battery,
    Disc,
    Gauge,
    Info
} from "lucide-react";

export const LoginPage = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    
    // Form states
    const [loginIdentifier, setLoginIdentifier] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    
    const [registerName, setRegisterName] = useState("");
    const [registerPhone, setRegisterPhone] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerAgree, setRegisterAgree] = useState(false);

    // Interactive UI states
    const [focusedField, setFocusedField] = useState<string | null>(null);

    // Error states
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

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

    // Validation functions
    const validateLoginForm = () => {
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

    const validateRegisterForm = () => {
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

    // Submissions
    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateLoginForm()) return;
        
        setIsLoading(true);
        setErrors({});
        
        setTimeout(() => {
            setIsLoading(false);
            setSuccessMessage("ورود شما با موفقیت انجام شد. به اتو پلاس خوش آمدید!");
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }, 1500);
    };

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateRegisterForm()) return;
        
        setIsLoading(true);
        setErrors({});
        
        setTimeout(() => {
            setIsLoading(false);
            setSuccessMessage("حساب کاربری شما ساخته شد. آماده استفاده از خدمات ویژه هستید!");
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }, 1500);
    };

    return (
        <div className="relative min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 z-0 opacity-30 mesh-gradient pointer-events-none" />
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-secondary-container/5 rounded-full blur-3xl pointer-events-none animate-pulse duration-[10000ms]" />
            
            {/* Layout Wrapper with Rounded 3rem from Aboutus design system */}
            <div className="relative z-10 w-full max-w-5xl bg-white/70 border border-outline-variant/60 rounded-[2.5rem] shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col lg:flex-row transition-all duration-500">
                
                {/* Visual Left Section - Brand Info & Active Diagnostics Panel */}
                <div className="w-full lg:w-[48%] mesh-gradient-bg p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
                    {/* Glowing Mesh Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent pointer-events-none z-0" />
                    
                    {/* Floating animated blobs */}
                    <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-bounce duration-[15000ms]" />
                    <div className="absolute bottom-1/3 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse duration-[6000ms]" />
                    
                    {/* Top Identity Block */}
                    <div className="relative z-10 flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="size-11 text-white bg-white/10 rounded-xl flex items-center justify-center p-2 backdrop-blur-md shadow-lg border border-white/20">
                                <svg fill="none" viewBox="0 0 48 48" className="w-full h-full text-white" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"/>
                                </svg>
                            </div>
                            <span className="text-title-lg font-black tracking-tight">اتو پلاس</span>
                        </div>
                        
                        <div className="space-y-4 mt-6">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-label-sm font-bold border border-white/15">
                                <Sparkles className="size-3.5" /> نسخه جدید اتو پلاس ۲.۰
                            </span>
                            <h2 className="text-headline-lg font-black leading-tight text-white drop-shadow-sm">
                                مدیریت و ارتقای کیفیت <br />
                                <span className="text-secondary-fixed">خدمات خودروی شما</span>
                            </h2>
                            <p className="text-body-md text-primary-fixed-dim/90 font-medium leading-relaxed max-w-md">
                                از خدمات شفاف تعمیراتی تا شبیه‌ساز عیب‌یابی دوره‌ای؛ با اتو پلاس خودروی شما همیشه در امن‌ترین حالت ممکن خواهد بود.
                            </p>
                        </div>
                    </div>

                    {/* Highly Modern Live Vehicle Diagnostic Teaser Dashboard */}
                    <div className="relative z-10 my-10 glass-panel rounded-2xl p-6 border border-white/15 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] bg-white/5">
                        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </span>
                                <span className="text-label-sm font-bold">عیب‌یاب هوشمند خودرو</span>
                            </div>
                            <span className="text-label-sm text-primary-fixed-dim">پژو ۲۰۷i</span>
                        </div>

                        {/* Diagnostics Matrix */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                                <Cpu className="size-5 text-secondary-fixed shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-label-sm text-primary-fixed-dim">سلامت موتور</span>
                                    <span className="text-body-md font-bold text-white">۹۸٪ (عالی)</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                                <Battery className="size-5 text-amber-300 shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-label-sm text-primary-fixed-dim">ولتاژ باتری</span>
                                    <span className="text-body-md font-bold text-white">۱۲.۶ ولت</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                                <Disc className="size-5 text-sky-300 shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-label-sm text-primary-fixed-dim">لنت ترمز</span>
                                    <span className="text-body-md font-bold text-white">۷۵٪ (ایمن)</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                                <Gauge className="size-5 text-emerald-300 shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-label-sm text-primary-fixed-dim">سطح روغن</span>
                                    <span className="text-body-md font-bold text-white">مطلوب</span>
                                </div>
                            </div>
                        </div>

                        {/* Diagnostics Status line */}
                        <div className="mt-4 flex items-center justify-between text-label-sm text-primary-fixed-dim bg-white/5 p-2 px-3 rounded-md">
                            <span>آخرین بررسی: ۵ دقیقه پیش</span>
                            <span className="text-emerald-400 font-bold">بدون خطا</span>
                        </div>
                    </div>

                    {/* Stats & Verification Banner */}
                    <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-primary-fixed-dim">
                        <div className="text-right">
                            <div className="text-title-lg font-black text-white">+۱۷ سال</div>
                            <div className="text-label-sm">سابقه خدمت‌رسانی</div>
                        </div>
                        <div className="text-right">
                            <div className="text-title-lg font-black text-white">۱۰۰٪</div>
                            <div className="text-label-sm">تضمین کیفیت قطعات</div>
                        </div>
                        <div className="flex items-center gap-1.5 text-white/90">
                            <ShieldCheck className="size-5 text-emerald-400" />
                            <span className="text-label-sm font-bold">مورد تایید صنف</span>
                        </div>
                    </div>
                </div>

                {/* Form Right Section */}
                <div className="w-full lg:w-[52%] p-8 md:p-12 flex flex-col justify-center bg-white/80">
                    
                    {/* Success Overlay with dynamic greeting */}
                    {successMessage && (
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
                    )}

                    {!successMessage && (
                        <>
                            {/* Sliding Tabs Switcher - Highly Modern Indicator */}
                            <div className="relative flex bg-surface-container-low rounded-xl p-1 mb-8 w-full border border-outline-variant/40">
                                <div 
                                    className="absolute top-1 bottom-1 bg-primary rounded-[10px] shadow-md transition-all duration-300 ease-out"
                                    style={{
                                        width: "calc(50% - 4px)",
                                        transform: isLogin ? "translateX(0%)" : "translateX(-100%)",
                                        right: "4px"
                                    }}
                                />
                                <button 
                                    type="button"
                                    onClick={() => { setIsLogin(true); setErrors({}); }}
                                    className={`flex-1 text-center py-3 text-label-lg font-bold rounded-xl relative z-10 transition-colors duration-300 ${
                                        isLogin ? "text-on-primary" : "text-on-surface-variant hover:text-primary"
                                    }`}
                                >
                                    ورود به حساب
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => { setIsLogin(false); setErrors({}); }}
                                    className={`flex-1 text-center py-3 text-label-lg font-bold rounded-xl relative z-10 transition-colors duration-300 ${
                                        !isLogin ? "text-on-primary" : "text-on-surface-variant hover:text-primary"
                                    }`}
                                >
                                    ثبت‌نام جدید
                                </button>
                            </div>

                            {/* Header Intro and Interactive Live Greeting */}
                            <div className="mb-8">
                                <h3 className="text-headline-md font-black text-primary leading-tight">
                                    {isLogin ? "خوش آمدید" : "عضویت در اتو پلاس"}
                                </h3>
                                
                                {isLogin ? (
                                    <p className="text-body-md text-on-surface-variant mt-2 font-medium">
                                        برای ادامه لطفا وارد حساب کاربری خود شوید.
                                    </p>
                                ) : (
                                    <p className="text-body-md text-on-surface-variant mt-2 font-medium transition-all duration-300">
                                        {registerName ? (
                                            <span className="text-primary font-bold animate-pulse">
                                                سلام {registerName} عزیز! خوشحالیم که به ما می‌پیوندی.
                                            </span>
                                        ) : (
                                            "حساب خود را ایجاد کنید و از پنل هوشمند عیب‌یابی لذت ببرید."
                                        )}
                                    </p>
                                )}
                            </div>

                            {/* Forms */}
                            {isLogin ? (
                                /* LOGIN FORM */
                                <form onSubmit={handleLoginSubmit} className="space-y-6">
                                    
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
                            ) : (
                                /* REGISTER FORM WITH PASSSWORD ANALYZER & LIVE GREETINGS */
                                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                                    
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

                                    {/* Accept Terms Checkbox */}
                                    <div className="space-y-2">
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
                            )}

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
                    )}
                </div>
            </div>
        </div>
    );
};
