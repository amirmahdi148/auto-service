import { useState } from "react";
import { TrendingUp } from "lucide-react";

const REVENUE_SERIES = [
    { day: "شنبه", height: 45 },
    { day: "یکشنبه", height: 72 },
    { day: "دوشنبه", height: 58 },
    { day: "سه‌شنبه", height: 88 },
    { day: "چهارشنبه", height: 64 },
    { day: "پنجشنبه", height: 95 },
    { day: "جمعه", height: 38 },
];

const PERIODS = [
    { id: "week", label: "هفته" },
    { id: "month", label: "ماه" },
    { id: "year", label: "سال" },
] as const;

type Period = (typeof PERIODS)[number]["id"];

export const RevenueChart = () => {
    const [period, setPeriod] = useState<Period>("week");

    return (
        <div className="lg:col-span-2 rounded-2xl bg-surface border border-outline-variant p-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <div className="flex flex-col gap-0.5">
                    <h2 className="text-on-surface text-title-lg font-bold">روند درآمد</h2>
                    <div className="flex items-baseline gap-2">
                        <span className="text-on-surface text-headline-md font-black tabular-nums">۵۲٬۴۰۰٬۰۰۰</span>
                        <span className="text-on-surface-variant text-label-lg">تومان</span>
                        <span className="flex items-center gap-0.5 text-primary text-label-sm font-bold">
                            <TrendingUp className="size-3.5" strokeWidth={2}/> ٪۱۸
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-1 p-1 rounded-full bg-surface-container-high">
                    {PERIODS.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => setPeriod(opt.id)}
                            className={`h-8 px-4 rounded-full text-label-sm font-bold transition-colors cursor-pointer ${
                                period === opt.id ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-on-surface"
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between gap-3 h-48">
                {REVENUE_SERIES.map((bar) => {
                    const isPeak = bar.height === Math.max(...REVENUE_SERIES.map(b => b.height));
                    return (
                        <div key={bar.day} className="flex flex-col items-center gap-2 flex-1 h-full justify-end group">
                            <div className="relative w-full flex justify-center h-full items-end">
                                <span className={`absolute -top-6 px-2 py-0.5 rounded-full text-label-xs font-bold whitespace-nowrap transition-opacity ${isPeak ? "opacity-100 bg-primary text-on-primary" : "opacity-0 group-hover:opacity-100 bg-on-surface text-surface"}`}>
                                    {bar.height}٪
                                </span>
                                <div
                                    className={`w-full max-w-[2.5rem] rounded-t-lg rounded-b-sm transition-all duration-500 ${
                                        isPeak ? "bg-primary" : "bg-primary/25 group-hover:bg-primary/40"
                                    }`}
                                    style={{ height: `${bar.height}%` }}
                                />
                            </div>
                            <span className="text-on-surface-variant text-label-xs font-medium">{bar.day}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
