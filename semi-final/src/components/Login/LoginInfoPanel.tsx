import React from "react";
import { Sparkles, Cpu, Battery, Disc, Gauge, ShieldCheck } from "lucide-react";

export const LoginInfoPanel: React.FC = () => {
    return (
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
    );
};
