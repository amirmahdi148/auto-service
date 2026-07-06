import { useState } from "react";
import { useAuth } from "../../contexts/useAuth.ts";
import { 
    User, 
    Lock, 
    Bell, 
    Store, 
    Save, 
    Camera,
    MapPin,
    Clock,
    Phone
} from "lucide-react";

export const SettingsPage = () => {
    const { user, role } = useAuth();
    const isSpecialist = role === "specialist";

    // Form states
    const [profileData, setProfileData] = useState({
        name: user?.name || "",
        phone: "۰۹۱۲۳۴۵۶۷۸۹",
        email: "user@example.com"
    });

    const [centerData, setCenterData] = useState({
        name: "مرکز خدمات تخصصی اتو پلاس",
        address: "تهران، خیابان ولیعصر، نرسیده به تجریش، پلاک ۱۲۳",
        phone: "۰۲۱-۸۸۸۸۸۸۸۸",
        workingHours: "شنبه تا پنجشنبه - ۸ صبح تا ۸ شب"
    });

    const [notifySms, setNotifySms] = useState(true);
    const [notifyEmail, setNotifyEmail] = useState(false);

    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full pb-8">
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
                    <a href="#profile" className="flex items-center gap-3 h-11 px-4 rounded-xl bg-primary/10 text-primary font-bold text-label-md">
                        <User className="size-4" strokeWidth={2}/> اطلاعات فردی
                    </a>
                    {isSpecialist && (
                        <a href="#center" className="flex items-center gap-3 h-11 px-4 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-bold text-label-md transition-colors">
                            <Store className="size-4" strokeWidth={1.5}/> تنظیمات مرکز
                        </a>
                    )}
                    <a href="#security" className="flex items-center gap-3 h-11 px-4 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-bold text-label-md transition-colors">
                        <Lock className="size-4" strokeWidth={1.5}/> امنیت و رمز عبور
                    </a>
                    <a href="#notifications" className="flex items-center gap-3 h-11 px-4 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-bold text-label-md transition-colors">
                        <Bell className="size-4" strokeWidth={1.5}/> اطلاع‌رسانی‌ها
                    </a>
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
                                <button className="absolute bottom-0 -right-1 w-7 h-7 bg-primary text-on-primary rounded-full flex items-center justify-center border-2 border-surface cursor-pointer hover:bg-primary/90 transition-colors shadow-sm">
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
                            <button className="flex items-center gap-2 h-10 px-6 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary/90 transition-colors cursor-pointer text-label-md shadow-sm">
                                <Save className="size-4" strokeWidth={2}/>
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
                                <button className="flex items-center gap-2 h-10 px-6 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary/90 transition-colors cursor-pointer text-label-md shadow-sm">
                                    <Save className="size-4" strokeWidth={2}/>
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
                                    placeholder="••••••••" 
                                    className="h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface" 
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-label-sm font-bold text-on-surface-variant">رمز عبور جدید</label>
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface" 
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-label-sm font-bold text-on-surface-variant">تکرار رمز عبور جدید</label>
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface" 
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-2">
                            <button className="flex items-center gap-2 h-10 px-6 rounded-xl bg-surface-container-high text-on-surface font-bold hover:bg-surface-container-highest transition-colors cursor-pointer text-label-md">
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
