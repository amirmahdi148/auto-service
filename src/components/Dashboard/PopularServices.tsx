import { Wrench, Activity, Car, Search, Sparkles } from "lucide-react";

interface PopularService {
    name: string;
    count: number;
    share: number;
    Icon: typeof Wrench;
}

const POPULAR_SERVICES: PopularService[] = [
    { name: "تعویض روغن و فیلتر", count: 342, share: 92, Icon: Wrench },
    { name: "بازدید دوره‌ای", count: 218, share: 74, Icon: Activity },
    { name: "تعویض لاستیک", count: 156, share: 58, Icon: Car },
    { name: "عیب‌یابی هوشمند", count: 98, share: 41, Icon: Search },
    { name: "دیتیلینگ و رنگ", count: 64, share: 28, Icon: Sparkles },
];

export const PopularServices = () => (
    <div className="rounded-2xl bg-surface border border-outline-variant p-6">
        <h2 className="text-on-surface text-title-lg font-bold mb-5">خدمات پرطرفدار</h2>
        <ul className="flex flex-col gap-4">
            {POPULAR_SERVICES.map((s) => (
                <li key={s.name} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-on-surface text-label-lg font-medium">
                            <s.Icon className="size-4 text-primary" strokeWidth={1.5}/>
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
