import { useQuery } from "@tanstack/react-query";
import { Car, Wrench, Wallet, BellRing, Loader2 } from "lucide-react";
import { HttpService } from "../../utils/HttpService";

const ICON_MAP: Record<string, typeof Car> = {
    "خودروهای من": Car,
    "سرویس‌های در پیش": Wrench,
    "موجودی کیف پول": Wallet,
    "اعلان‌ها": BellRing,
};

const COLOR_MAP: Record<string, string> = {
    "خودروهای من": "text-primary",
    "سرویس‌های در پیش": "text-tertiary",
    "موجودی کیف پول": "text-secondary",
    "اعلان‌ها": "text-error",
};

const BG_MAP: Record<string, string> = {
    "خودروهای من": "bg-primary/10",
    "سرویس‌های در پیش": "bg-tertiary/10",
    "موجودی کیف پول": "bg-secondary/10",
    "اعلان‌ها": "bg-error/10",
};

export const UserKpiCards = () => {
    const { data: kpis = [] } = useQuery({
        queryKey: ["dashboard-user-kpis"],
        queryFn: () => HttpService.get<{ title: string; value: string; label: string }[]>("/api/dashboard/user-kpis"),
    });

    if (kpis.length === 0) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1,2,3,4].map((i) => (
                    <div key={i} className="flex items-center justify-center h-24 rounded-2xl bg-surface border border-outline-variant">
                        <Loader2 className="size-6 animate-spin text-on-surface-variant" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi, i) => {
                const Icon = ICON_MAP[kpi.title] || Car;
                const color = COLOR_MAP[kpi.title] || "text-primary";
                const bg = BG_MAP[kpi.title] || "bg-primary/10";
                return (
                    <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-surface border border-outline-variant hover:border-primary/20 hover:bg-surface-container-low transition-colors cursor-pointer group">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${bg} ${color}`}>
                            <Icon className="size-6" strokeWidth={1.5}/>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-on-surface-variant text-label-md font-bold mb-1">{kpi.title}</span>
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-on-surface text-title-lg font-bold">{kpi.value}</span>
                                <span className="text-on-surface-variant text-label-sm">{kpi.label}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
