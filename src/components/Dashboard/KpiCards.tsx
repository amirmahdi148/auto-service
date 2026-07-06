import { CircleDollarSign, CalendarCheck, Users, Wrench, ArrowUpLeft, ArrowDownLeft } from "lucide-react";

type KpiTrend = "up" | "down";

interface Kpi {
    Icon: typeof CircleDollarSign;
    label: string;
    value: string;
    unit: string;
    trend: KpiTrend;
    change: string;
    sub: string;
}

const KPIS: Kpi[] = [
    { Icon: CircleDollarSign, label: "درآمد این ماه", value: "۵۲٬۴۰۰٬۰۰۰", unit: "تومان", trend: "up", change: "٪۱۸", sub: "نسبت به ماه قبل" },
    { Icon: CalendarCheck, label: "رزروهای کل", value: "۱۲۸", unit: "نوبت", trend: "up", change: "٪۱۲", sub: "نسبت به ماه قبل" },
    { Icon: Users, label: "مشتریان فعال", value: "۱٬۴۲۰", unit: "نفر", trend: "up", change: "٪۸", sub: "نسبت به ماه قبل" },
    { Icon: Wrench, label: "خدمات در حال انجام", value: "۸", unit: "خدمت", trend: "down", change: "٪۳", sub: "نسبت به ماه قبل" },
];

export const KpiCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((kpi) => {
            const TrendIcon = kpi.trend === "up" ? ArrowUpLeft : ArrowDownLeft;
            return (
                <div key={kpi.label} className="flex flex-col gap-3 rounded-2xl bg-surface border border-outline-variant p-5 hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                            <kpi.Icon className="size-5" strokeWidth={1.5}/>
                        </div>
                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-label-sm font-bold ${
                            kpi.trend === "up" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                        }`}>
                            <TrendIcon className="size-3.5" strokeWidth={2}/>
                            {kpi.change}
                        </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-on-surface text-display-lg-mobile font-black tabular-nums leading-none">{kpi.value}</span>
                        <span className="text-on-surface-variant text-label-sm">{kpi.unit}</span>
                    </div>
                    <span className="text-on-surface-variant text-label-sm">{kpi.label}</span>
                </div>
            );
        })}
    </div>
);
