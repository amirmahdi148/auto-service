import { CalendarPlus, Users, FileText, Wrench, Settings, Download } from "lucide-react";

const QUICK_ACTIONS = [
    { Icon: CalendarPlus, label: "رزرو نوبت جدید" },
    { Icon: Users, label: "مدیریت مشتریان" },
    { Icon: FileText, label: "گزارش‌ها" },
    { Icon: Wrench, label: "خدمات" },
    { Icon: Settings, label: "تنظیمات" },
    { Icon: Download, label: "خروجی اطلاعات" },
];

export const QuickActions = () => (
    <div className="rounded-2xl bg-surface border border-outline-variant p-6">
        <h2 className="text-on-surface text-title-lg font-bold mb-5">دسترسی سریع</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {QUICK_ACTIONS.map((action) => (
                <button
                    key={action.label}
                    className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-surface-container-low hover:bg-primary-container border border-transparent hover:border-primary/20 transition-colors cursor-pointer"
                >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                        <action.Icon className="size-5" strokeWidth={1.5}/>
                    </div>
                    <span className="text-on-surface-variant group-hover:text-on-primary-container text-label-sm font-bold text-center transition-colors">{action.label}</span>
                </button>
            ))}
        </div>
    </div>
);
