import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../contexts/useAuth.ts";
import { HttpService } from "../../utils/HttpService.ts";
import { 
    User, 
    Lock, 
    Bell, 
    Store, 
    Save, 
    Camera,
    MapPin,
    Clock,
    Phone,
    CheckCircle2,
    Loader2,
} from "lucide-react";

export const SettingsPage = () => {
    const { user, role } = useAuth();
    const isSpecialist = role === "specialist";
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [activeTab, setActiveTab] = useState("profile");
    const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: "", visible: false });

    const showToast = (message: string) => {
        setToast({ message, visible: true });
        setTimeout(() => setToast({ message: "", visible: false }), 3000);
    };

    const scrollToSection = (id: string) => {
        setActiveTab(id);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    // Form states
    const [profileData, setProfileData] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        email: user?.email || ""
    });

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || "",
                phone: user.phone || "",
                email: user.email || ""
            });
        }
    }, [user]);

    const [centerData, setCenterData] = useState({
        name: "مرکز خدمات تخصصی اتو پلاس",
        address: "تهران، خیابان ولیعصر، نرسیده به تجریش، پلاک ۱۲۳",
        phone: "۰۲۱-۸۸۸۸۸۸۸۸",
        workingHours: "شنبه تا پنجشنبه - ۸ صبح تا ۸ شب"
    });

    const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
    const [notifySms, setNotifySms] = useState(true);
    const [notifyEmail, setNotifyEmail] = useState(false);

    const profileMutation = useMutation({
        mutationFn: (data: typeof profileData) =>
            HttpService.put("/api/auth/me", { data }),
        onSuccess: () => showToast("اطلاعات با موفقیت ذخیره شد"),
        onError: () => showToast("خطا در ذخیره اطلاعات"),
    });

    const centerMutation = useMutation({
        mutationFn: (data: typeof centerData) =>
            HttpService.put("/api/auth/center", { data }),
        onSuccess: () => showToast("تغییرات مرکز با موفقیت ذخیره شد"),
        onError: () => showToast("خطا در ذخیره تغییرات مرکز"),
    });

    const passwordMutation = useMutation({
        mutationFn: (data: typeof passwords) =>
            HttpService.put("/api/auth/password", { data: { currentPassword: data.current, newPassword: data.newPass, confirmPassword: data.confirm } }),
        onSuccess: () => {
            showToast("رمز عبور با موفقیت تغییر کرد");
            setPasswords({ current: "", newPass: "", confirm: "" });
        },
        onError: (err: { message?: string }) => showToast(err?.message || "خطا در تغییر رمز عبور"),
    });

    const handleSaveProfile = () => {
        profileMutation.mutate(profileData);
    };

    const handleSaveCenter = () => {
        centerMutation.mutate(centerData);
    };

    const handleChangePassword = () => {
        if (!passwords.current) {
            showToast("لطفاً رمز عبور فعلی را وارد کنید");
            return;
        }
        if (!passwords.newPass) {
            showToast("لطفاً رمز عبور جدید را وارد کنید");
            return;
        }
        if (passwords.newPass.length < 6) {
            showToast("رمز عبور جدید باید حداقل ۶ کاراکتر باشد");
            return;
        }
        if (passwords.newPass !== passwords.confirm) {
            showToast("رمز عبور جدید و تکرار آن مطابقت ندارند");
            return;
        }
        passwordMutation.mutate(passwords);
    };

    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full pb-8">
            {/* Toast notification */}
            {toast.visible && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl bg-surface border border-outline-variant shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    <CheckCircle2 className="size-5 text-primary" strokeWidth={2}/>
                    <span className="text-label-md font-bold text-on-surface">{toast.message}</span>
                </div>
            )}

            {/* ===================== HEADER ===================== */}
            <div className="flex flex-col gap-1 border-b border-outline-variant/50 pb-6">
                <h1 className="text-on-surface text-headline-md font-black">تنظیمات حساب کاربری</h1>
                <p className="text-on-surface-variant text-body-md">
                    مدیریت اطلاعات فردی{isSpecialist ? " و تنظیمات مرکز خدمات" : ""}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sidebar Navigation for Settings (Optional for larger screens) */}
                <div className="hidden md:flex flex-col gap-2 sticky top-6 self-start">
                    <button onClick={() => scrollToSection("profile")} className={`flex items-center gap-3 h-11 px-4 rounded-xl font-bold text-label-md transition-colors cursor-pointer ${activeTab === "profile" ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}>
                        <User className="size-4" strokeWidth={2}/> اطلاعات فردی
                    </button>
                    {isSpecialist && (
                        <button onClick={() => scrollToSection("center")} className={`flex items-center gap-3 h-11 px-4 rounded-xl font-bold text-label-md transition-colors cursor-pointer ${activeTab === "center" ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}>
                            <Store className="size-4" strokeWidth={1.5}/> تنظیمات مرکز
                        </button>
                    )}
                    <button onClick={() => scrollToSection("security")} className={`flex items-center gap-3 h-11 px-4 rounded-xl font-bold text-label-md transition-colors cursor-pointer ${activeTab === "security" ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}>
                        <Lock className="size-4" strokeWidth={1.5}/> امنیت و رمز عبور
                    </button>
                    <button onClick={() => scrollToSection("notifications")} className={`flex items-center gap-3 h-11 px-4 rounded-xl font-bold text-label-md transition-colors cursor-pointer ${activeTab === "notifications" ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}>
                        <Bell className="size-4" strokeWidth={1.5}/> اطلاع‌رسانی‌ها
                    </button>
                </div>

                {/* Settings Sections */}
                <div className="col-span-1 md:col-span-2 flex flex-col gap-8">
                    
                    {/* ===== Profile Section ===== */}
                    <section id="profile" className="flex flex-col gap-5 bg-surface border border-outline-variant rounded-2xl p-5 sm:p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <User className="size-5" strokeWidth={1.5}/>
                            </div>
                            <h2 className="text-title-lg font-bold text-on-surface">اطلاعات فردی</h2>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border-b border-outline-variant/50 pb-6">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center text-headline-md font-bold overflow-hidden border-2 border-surface shadow-sm">
                                    {profileData.name ? profileData.name.charAt(0) : "ک"}
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png"
                                    className="hidden"
                                    onChange={() => showToast("تصویر پروفایل با موفقیت آپلود شد")}
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-0 -right-1 w-7 h-7 bg-primary text-on-primary rounded-full flex items-center justify-center border-2 border-surface cursor-pointer hover:bg-primary/90 transition-colors shadow-sm"
                                >
                                    <Camera className="size-3.5" strokeWidth={2}/>
                                </button>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-on-surface font-bold text-title-md">تصویر پروفایل</span>
                                <span className="text-on-surface-variant text-label-sm max-w-xs">فرمت‌های مجاز: JPG, PNG. حداکثر حجم ۲ مگابایت.</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-label-sm font-bold text-on-surface-variant">نام و نام خانوادگی</label>
                                <input 
                                    type="text" 
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                                    className="h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface" 
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-label-sm font-bold text-on-surface-variant">شماره موبایل</label>
                                <input 
                                    type="text" 
                                    value={profileData.phone}
                                    dir="ltr"
                                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                                    className="h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface text-left" 
                                />
                            </div>
                            <div className="flex flex-col gap-1.5 sm:col-span-2">
                                <label className="text-label-sm font-bold text-on-surface-variant">آدرس ایمیل</label>
                                <input 
                                    type="email" 
                                    value={profileData.email}
                                    dir="ltr"
                                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                    className="h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface text-left" 
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-2">
                            <button onClick={handleSaveProfile} disabled={profileMutation.isPending} className="flex items-center gap-2 h-10 px-6 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary/90 disabled:opacity-50 transition-colors cursor-pointer text-label-md shadow-sm">
                                {profileMutation.isPending ? <Loader2 className="size-4 animate-spin" strokeWidth={2}/> : <Save className="size-4" strokeWidth={2}/>}
                                ذخیره اطلاعات
                            </button>
                        </div>
                    </section>

                    {/* ===== Center Section (Specialist Only) ===== */}
                    {isSpecialist && (
                        <section id="center" className="flex flex-col gap-5 bg-surface border border-outline-variant rounded-2xl p-5 sm:p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-tertiary-container/50 text-on-tertiary-container flex items-center justify-center shrink-0">
                                    <Store className="size-5" strokeWidth={1.5}/>
                                </div>
                                <h2 className="text-title-lg font-bold text-on-surface">مشخصات مرکز خدمات</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5 sm:col-span-2">
                                    <label className="text-label-sm font-bold text-on-surface-variant flex items-center gap-1.5"><Store className="size-3.5"/> نام مرکز</label>
                                    <input 
                                        type="text" 
                                        value={centerData.name}
                                        onChange={(e) => setCenterData({...centerData, name: e.target.value})}
                                        className="h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface" 
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5 sm:col-span-2">
                                    <label className="text-label-sm font-bold text-on-surface-variant flex items-center gap-1.5"><MapPin className="size-3.5"/> آدرس دقیق</label>
                                    <input 
                                        type="text" 
                                        value={centerData.address}
                                        onChange={(e) => setCenterData({...centerData, address: e.target.value})}
                                        className="h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface" 
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-label-sm font-bold text-on-surface-variant flex items-center gap-1.5"><Phone className="size-3.5"/> تلفن مرکز</label>
                                    <input 
                                        type="text" 
                                        value={centerData.phone}
                                        dir="ltr"
                                        onChange={(e) => setCenterData({...centerData, phone: e.target.value})}
                                        className="h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface text-left" 
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-label-sm font-bold text-on-surface-variant flex items-center gap-1.5"><Clock className="size-3.5"/> ساعات کاری</label>
                                    <input 
                                        type="text" 
                                        value={centerData.workingHours}
                                        onChange={(e) => setCenterData({...centerData, workingHours: e.target.value})}
                                        className="h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface" 
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-2">
                                <button onClick={handleSaveCenter} disabled={centerMutation.isPending} className="flex items-center gap-2 h-10 px-6 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary/90 disabled:opacity-50 transition-colors cursor-pointer text-label-md shadow-sm">
                                    {centerMutation.isPending ? <Loader2 className="size-4 animate-spin" strokeWidth={2}/> : <Save className="size-4" strokeWidth={2}/>}
                                    ذخیره تغییرات مرکز
                                </button>
                            </div>
                        </section>
                    )}

                    {/* ===== Security Section ===== */}
                    <section id="security" className="flex flex-col gap-5 bg-surface border border-outline-variant rounded-2xl p-5 sm:p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-error/10 text-error flex items-center justify-center shrink-0">
                                <Lock className="size-5" strokeWidth={1.5}/>
                            </div>
                            <h2 className="text-title-lg font-bold text-on-surface">امنیت و رمز عبور</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5 sm:col-span-2">
                                <label className="text-label-sm font-bold text-on-surface-variant">رمز عبور فعلی</label>
                                <input
                                    type="password"
                                    value={passwords.current}
                                    onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                                    placeholder="••••••••"
                                    className="h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-label-sm font-bold text-on-surface-variant">رمز عبور جدید</label>
                                <input
                                    type="password"
                                    value={passwords.newPass}
                                    onChange={(e) => setPasswords({...passwords, newPass: e.target.value})}
                                    placeholder="••••••••"
                                    className="h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-label-sm font-bold text-on-surface-variant">تکرار رمز عبور جدید</label>
                                <input
                                    type="password"
                                    value={passwords.confirm}
                                    onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                                    placeholder="••••••••"
                                    className="h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-2">
                            <button onClick={handleChangePassword} disabled={passwordMutation.isPending} className="flex items-center gap-2 h-10 px-6 rounded-xl bg-surface-container-high text-on-surface font-bold hover:bg-surface-container-highest disabled:opacity-50 transition-colors cursor-pointer text-label-md">
                                {passwordMutation.isPending ? <Loader2 className="size-4 animate-spin" strokeWidth={2}/> : null}
                                تغییر رمز عبور
                            </button>
                        </div>
                    </section>

                    {/* ===== Notifications Section ===== */}
                    <section id="notifications" className="flex flex-col gap-5 bg-surface border border-outline-variant rounded-2xl p-5 sm:p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                                <Bell className="size-5" strokeWidth={1.5}/>
                            </div>
                            <h2 className="text-title-lg font-bold text-on-surface">تنظیمات اطلاع‌رسانی</h2>
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl border border-outline-variant/50 hover:bg-surface-container-lowest transition-colors">
                                <div className="flex flex-col pr-2">
                                    <span className="text-label-lg font-bold text-on-surface">پیامک (SMS)</span>
                                    <span className="text-label-sm text-on-surface-variant">دریافت پیامک برای یادآوری نوبت‌ها و تغییرات وضعیت</span>
                                </div>
                                <input 
                                    type="checkbox" 
                                    checked={notifySms} 
                                    onChange={() => setNotifySms(!notifySms)}
                                    className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer shrink-0" 
                                />
                            </label>
                            <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl border border-outline-variant/50 hover:bg-surface-container-lowest transition-colors">
                                <div className="flex flex-col pr-2">
                                    <span className="text-label-lg font-bold text-on-surface">ایمیل</span>
                                    <span className="text-label-sm text-on-surface-variant">دریافت خبرنامه و فاکتورها از طریق ایمیل</span>
                                </div>
                                <input 
                                    type="checkbox" 
                                    checked={notifyEmail} 
                                    onChange={() => setNotifyEmail(!notifyEmail)}
                                    className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer shrink-0" 
                                />
                            </label>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};
