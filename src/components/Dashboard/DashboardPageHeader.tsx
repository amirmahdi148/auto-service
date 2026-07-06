import { Search, Bell, CalendarPlus, Sparkles } from "lucide-react";

export const DashboardPageHeader = () => (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
                <h1 className="text-on-surface text-headline-md font-black">داشبورد مدیریت</h1>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-label-sm font-bold">
                    <Sparkles className="size-3"/> اتو پلاس
                </span>
            </div>
            <p className="text-on-surface-variant text-body-md">یکشنبه، ۱ تیر ۱۴۰۵ — خلاصه عملکرد کسب‌وکار شما</p>
        </div>

        <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 h-11 px-4 rounded-full bg-surface border border-outline-variant">
                <Search className="size-4 text-on-surface-variant" strokeWidth={1.5}/>
                <input placeholder="جستجو..." className="bg-transparent outline-none text-on-surface placeholder:text-on-surface-variant text-label-lg w-32"/>
            </div>
            <button aria-label="اعلان‌ها" className="relative flex items-center justify-center w-11 h-11 rounded-full bg-surface border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary/30 transition-colors cursor-pointer">
                <Bell className="size-5" strokeWidth={1.5}/>
                <span className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-secondary"/>
            </button>
            <button className="flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-on-primary font-bold text-label-lg cursor-pointer hover:bg-primary-container transition-colors">
                <CalendarPlus className="size-4" strokeWidth={1.5}/>
                <span className="hidden sm:inline">رزرو نوبت جدید</span>
                <span className="sm:hidden">رزرو</span>
            </button>
        </div>
    </header>
);
