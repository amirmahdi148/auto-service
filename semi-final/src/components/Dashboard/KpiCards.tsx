import { useQuery } from "@tanstack/react-query";
import { CircleDollarSign, CalendarCheck, Users, Wrench, ArrowUpLeft, ArrowDownLeft, Loader2 } from "lucide-react";
import { HttpService } from "../../utils/HttpService";
import type { DashboardKpi } from "../../api/data/dashboard";

const ICON_MAP: Record<string, typeof CircleDollarSign> = {
    "درآمد این ماه": CircleDollarSign,
    "رزروهای امروز": CalendarCheck,
    "مشتریان جدید": Users,
    "رضایت مشتریان": Wrench,
};

export const KpiCards = () => {
    const { data: kpis = [] } = useQuery({
        queryKey: ["dashboard-kpis"],
        queryFn: () => HttpService.get<DashboardKpi[]>("/api/dashboard/kpis"),
    });

    if (kpis.length === 0) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1,2,3,4].map((i) => (
                    <div key={i} className="flex items-center justify-center h-32 rounded-2xl bg-surface border border-outline-variant">
                        <Loader2 className="size-6 animate-spin text-on-surface-variant" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi) => {
                const Icon = ICON_MAP[kpi.label] || CircleDollarSign;
                const TrendIcon = kpi.trend === "up" ? ArrowUpLeft : ArrowDownLeft;
                return (
                    <div key={kpi.label} className="flex flex-col gap-3 rounded-2xl bg-surface border border-outline-variant p-5 hover:border-primary/30 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                                <Icon className="size-5" strokeWidth={1.5}/>
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
};
