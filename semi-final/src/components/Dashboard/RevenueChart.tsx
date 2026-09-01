import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, Loader2, DollarSign } from "lucide-react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import { HttpService } from "../../utils/HttpService";

const fmtToman = (n: number) => `${n.toLocaleString("fa-IR")} تومان`;
const toFa = (n: number) => n.toLocaleString("fa-IR");

const PERIODS = [
    { id: "week", label: "هفته" },
    { id: "month", label: "ماه" },
    { id: "year", label: "سال" },
] as const;

type Period = (typeof PERIODS)[number]["id"];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="px-3.5 py-2.5 rounded-xl bg-surface/95 backdrop-blur-md border border-outline-variant shadow-xl flex flex-col gap-1 text-right">
                <span className="text-label-xs font-bold text-on-surface-variant">{data.day}</span>
                <span className="text-label-md font-black text-primary">
                    ٪{toFa(data.value)} عملکرد
                </span>
            </div>
        );
    }
    return null;
};

export const RevenueChart = () => {
    const [period, setPeriod] = useState<Period>("week");

    const { data: revenue, isLoading } = useQuery({
        queryKey: ["dashboard-revenue", period],
        queryFn: () => HttpService.get<{ total: number; change: number; series: { day: string; value: number }[]; period: string }>("/api/dashboard/revenue", { params: { period } }),
    });

    const series = revenue?.series ?? [];

    return (
        <div className="lg:col-span-2 rounded-2xl bg-surface border border-outline-variant p-6 flex flex-col justify-between relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <DollarSign className="size-5" strokeWidth={2}/>
                        </div>
                        <h2 className="text-on-surface text-title-lg font-bold">روند درآمد مرکز</h2>
                    </div>
                    <div className="flex items-baseline gap-2.5 mt-1">
                        {revenue ? (
                            <>
                                <span className="text-on-surface text-headline-md font-black tabular-nums">{fmtToman(revenue.total)}</span>
                                <span className="flex items-center gap-1 text-primary text-label-md font-bold bg-primary/10 px-2.5 py-0.5 rounded-full">
                                    <TrendingUp className="size-3.5" strokeWidth={2}/> ٪{toFa(revenue.change)}
                                </span>
                            </>
                        ) : (
                            <Loader2 className="size-5 animate-spin text-on-surface-variant" />
                        )}
                    </div>
                </div>

                {/* Period Selector */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-container border border-outline-variant/60">
                    {PERIODS.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => setPeriod(opt.id)}
                            className={`h-8 px-4 rounded-lg text-label-sm font-bold transition-all cursor-pointer ${
                                period === opt.id 
                                    ? "bg-primary text-on-primary shadow-sm" 
                                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Recharts Component Container */}
            <div className="w-full h-56 mt-2">
                {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                        <Loader2 className="size-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={series} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="rechartsRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-primary, #1e40af)" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="var(--color-primary, #1e40af)" stopOpacity={0.0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-outline-variant/30" vertical={false} />
                            <XAxis 
                                dataKey="day" 
                                stroke="currentColor" 
                                className="text-on-surface-variant text-label-xs" 
                                tickLine={false} 
                                axisLine={false}
                            />
                            <YAxis 
                                stroke="currentColor" 
                                className="text-on-surface-variant text-label-xs" 
                                tickLine={false} 
                                axisLine={false} 
                                tickFormatter={(val) => `٪${toFa(val)}`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="var(--color-primary, #1e40af)"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#rechartsRevenueGradient)"
                                activeDot={{ r: 6, stroke: "var(--color-surface, #fff)", strokeWidth: 2, fill: "var(--color-primary, #1e40af)" }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};
