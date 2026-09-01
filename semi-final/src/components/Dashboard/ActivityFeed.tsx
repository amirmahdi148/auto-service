import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, UserPlus, AlertCircle, Wallet, Star, ChevronLeft, Clock, Loader2 } from "lucide-react";
import { HttpService } from "../../utils/HttpService";

const ICON_MAP: Record<string, typeof CheckCircle2> = {
    booking: CheckCircle2,
    payment: Wallet,
    user: UserPlus,
    alert: AlertCircle,
    review: Star,
};

const COLOR_MAP: Record<string, string> = {
    booking: "primary",
    payment: "primary",
    user: "primary",
    alert: "secondary",
    review: "primary",
};

export const ActivityFeed = () => {
    const { data: activities = [] } = useQuery({
        queryKey: ["dashboard-activity"],
        queryFn: () => HttpService.get<{ text: string; time: string; type: string }[]>("/api/dashboard/activity"),
    });

    return (
        <div className="rounded-2xl bg-surface border border-outline-variant p-6">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-on-surface text-title-lg font-bold">فعالیت‌های اخیر</h2>
                <button className="text-primary text-label-sm font-bold cursor-pointer hover:underline flex items-center gap-0.5">
                    همه <ChevronLeft className="size-3.5" strokeWidth={2}/>
                </button>
            </div>
            {activities.length === 0 ? (
                <div className="flex items-center justify-center h-32">
                    <Loader2 className="size-6 animate-spin text-on-surface-variant" />
                </div>
            ) : (
                <ul className="flex flex-col gap-1">
                    {activities.map((item, i) => {
                        const Icon = ICON_MAP[item.type] || CheckCircle2;
                        const color = COLOR_MAP[item.type] || "primary";
                        return (
                            <li key={i} className="flex items-start gap-3 relative pb-4 last:pb-0">
                                {i < activities.length - 1 && (
                                    <span className="absolute right-[18px] top-9 bottom-0 w-px bg-outline-variant"/>
                                )}
                                <div className={`relative z-10 flex items-center justify-center w-9 h-9 rounded-full shrink-0 ring-4 ring-surface ${
                                    color === "secondary" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
                                }`}>
                                    <Icon className="size-4" strokeWidth={1.5}/>
                                </div>
                                <div className="flex flex-col gap-0.5 pt-1.5">
                                    <span className="text-on-surface text-label-lg leading-snug">{item.text}</span>
                                    <span className="text-on-surface-variant text-label-sm flex items-center gap-1">
                                        <Clock className="size-3" strokeWidth={1.5}/> {item.time}
                                    </span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};
