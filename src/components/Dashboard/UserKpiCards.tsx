import { Car, Wrench, Wallet, BellRing } from "lucide-react";

const KPIS = [
    { title: "خودروهای من", value: "۲", label: "خودرو ثبت شده", icon: Car, color: "text-primary", bg: "bg-primary/10" },
    { title: "سرویس‌های در پیش", value: "۱", label: "۳ روز دیگر", icon: Wrench, color: "text-tertiary", bg: "bg-tertiary/10" },
    { title: "موجودی کیف پول", value: "۲۵۰٬۰۰۰", label: "تومان", icon: Wallet, color: "text-secondary", bg: "bg-secondary/10" },
    { title: "اعلان‌ها", value: "۳", label: "پیام جدید", icon: BellRing, color: "text-error", bg: "bg-error/10" },
];

export const UserKpiCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((kpi, i) => (
            <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-surface border border-outline-variant hover:border-primary/20 hover:bg-surface-container-low transition-colors cursor-pointer group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${kpi.bg} ${kpi.color}`}>
                    <kpi.icon className="size-6" strokeWidth={1.5}/>
                </div>
                <div className="flex flex-col">
                    <span className="text-on-surface-variant text-label-md font-bold mb-1">{kpi.title}</span>
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-on-surface text-title-lg font-bold">{kpi.value}</span>
                        <span className="text-on-surface-variant text-label-sm">{kpi.label}</span>
                    </div>
                </div>
            </div>
        ))}
    </div>
);
