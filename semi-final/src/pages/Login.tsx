import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { LoginInfoPanel } from "../components/Login/LoginInfoPanel.tsx";
import { LoginForm } from "../components/Login/LoginForm.tsx";
import { RegisterForm } from "../components/Login/RegisterForm.tsx";
import { AuthSuccess } from "../components/Login/AuthSuccess.tsx";
import { SocialLogin } from "../components/Login/SocialLogin.tsx";

export const LoginPage = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [registerName, setRegisterName] = useState("");
    const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current);
        };
    }, []);

    const handleLoginSuccess = (message: string) => {
        setSuccessMessage(message);
        timerRef.current = setTimeout(() => {
            navigate("/dashboard");
        }, 2000);
    };

    const handleRegisterSuccess = (name: string, message: string) => {
        setRegisterName(name);
        setSuccessMessage(message);
        timerRef.current = setTimeout(() => {
            navigate("/");
        }, 2000);
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
                <LoginInfoPanel />

                {/* Form Right Section */}
                <div className="w-full lg:w-[52%] p-8 md:p-12 flex flex-col justify-center bg-white/80">
                    
                    {/* Success Overlay with dynamic greeting */}
                    {successMessage && (
                        <AuthSuccess registerName={registerName} successMessage={successMessage} />
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
                                    onClick={() => setIsLogin(true)}
                                    className={`flex-1 text-center py-3 text-label-lg font-bold rounded-xl relative z-10 transition-colors duration-300 ${
                                        isLogin ? "text-on-primary" : "text-on-surface-variant hover:text-primary"
                                    }`}
                                >
                                    ورود به حساب
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setIsLogin(false)}
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
                                <LoginForm onSuccess={handleLoginSuccess} />
                            ) : (
                                <RegisterForm 
                                    onSuccess={handleRegisterSuccess} 
                                    registerName={registerName}
                                    setRegisterName={setRegisterName}
                                />
                            )}

                            <SocialLogin />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
