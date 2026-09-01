import { useQuery } from "@tanstack/react-query";
import { Wrench, Loader2 } from "lucide-react";
import { HttpService } from "../../utils/HttpService";

export const PopularServices = () => {
    const { data: services = [] } = useQuery({
        queryKey: ["dashboard-popular-services"],
        queryFn: () => HttpService.get<{ name: string; count: number; share: number }[]>("/api/dashboard/popular-services"),
    });

    if (services.length === 0) {
        return (
            <div className="rounded-2xl bg-surface border border-outline-variant p-6 flex items-center justify-center h-40">
                <Loader2 className="size-6 animate-spin text-on-surface-variant" />
            </div>
        );
    }

    return (
        <div className="rounded-2xl bg-surface border border-outline-variant p-6">
            <h2 className="text-on-surface text-title-lg font-bold mb-5">خدمات پرطرفدار</h2>
            <ul className="flex flex-col gap-4">
                {services.map((s) => (
                    <li key={s.name} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-on-surface text-label-lg font-medium">
                                <Wrench className="size-4 text-primary" strokeWidth={1.5}/>
                                {s.name}
                            </span>
                            <span className="text-on-surface-variant text-label-sm tabular-nums">{s.count}</span>
                        </div>
                        <div className="h-2 rounded-full bg-surface-container-high overflow-hidden">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${s.share}%` }}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
