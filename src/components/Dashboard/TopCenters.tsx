import { Star, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { HttpService } from "../../utils/HttpService";

interface TopCenter {
    name: string;
    rating: string;
    bookings: number;
    share: number;
}

function toPersian(n: number): string {
    return n.toLocaleString("fa-IR");
}

export const TopCenters = () => {
    const { data: centers, isLoading } = useQuery({
        queryKey: ["top-centers"],
        queryFn: () => HttpService.get<TopCenter[]>("/api/top-centers"),
    });

    return (
        <div className="rounded-2xl bg-surface border border-outline-variant p-6">
            <h2 className="text-on-surface text-title-lg font-bold mb-5">برترین مراکز</h2>
            {isLoading ? (
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="size-6 animate-spin text-primary" />
                </div>
            ) : (
                <ul className="flex flex-col gap-3">
                    {centers?.map((c, i) => (
                        <li key={c.name} className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-label-sm font-bold shrink-0">{toPersian(i + 1)}</span>
                            <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                                <span className="text-on-surface text-label-lg font-bold truncate">{c.name}</span>
                                <span className="flex items-center gap-1 text-on-surface-variant text-label-sm">
                                    <Star className="size-3 fill-current text-tertiary-fixed-dim"/>{c.rating} • {c.bookings} رزرو
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
