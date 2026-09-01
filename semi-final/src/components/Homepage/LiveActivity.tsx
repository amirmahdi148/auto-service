import {useQuery} from "@tanstack/react-query";
import {useInView} from "../../utils/useInView";
import {HttpService} from "../../utils/HttpService";
import type {Booking} from "../../api/data/bookings";
import {CheckCircle2, Wrench, Clock} from "lucide-react";

interface BookingsResponse {
    data: Booking[];
    meta: { page: number; limit: number; totalPages: number; totalItems: number };
}

const STATUS_ICON: Record<string, typeof CheckCircle2> = {
    completed: CheckCircle2,
    "in-progress": Wrench,
    confirmed: Clock,
    pending: Clock,
};

export const LiveActivity = () => {
    const {ref, inView} = useInView<HTMLDivElement>(0.2);

    const {data} = useQuery({
        queryKey: ["bookings", "homepage-activity"],
        queryFn: () => HttpService.get<BookingsResponse>("/api/bookings", {
            params: {limit: 20, status: "all"},
        }),
        staleTime: 60_000,
    });

    const bookings = (data?.data ?? [])
        .filter((b) => b.status !== "cancelled")
        .slice(0, 12);

    if (bookings.length === 0) return null;

    return (
        <div
            ref={ref}
            className={`overflow-hidden transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
            <div className="bg-surface-container-low py-3 overflow-hidden">
                <div className="flex items-center gap-3 pe-4 group">
                    {/* Live indicator */}
                    <div className="flex items-center gap-1.5 shrink-0 ps-4">
                        <span className="relative flex size-2">
                            <span className="absolute inline-flex size-full rounded-full bg-secondary opacity-75 animate-ping"/>
                            <span className="relative inline-flex size-2 rounded-full bg-secondary"/>
                        </span>
                        <span className="text-label-sm font-bold text-secondary">زنده</span>
                    </div>

                    {/* Marquee track */}
                    <div className="overflow-hidden flex-1">
                        <div className="flex gap-8 animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
                            {/* First track */}
                            {bookings.map((b) => {
                                const Icon = STATUS_ICON[b.status] ?? Clock;
                                return (
                                    <span key={b.id} className="flex items-center gap-2 whitespace-nowrap text-body-md text-on-surface-variant">
                                        <Icon className="size-4 shrink-0 text-primary" strokeWidth={1.5}/>
                                        <span>
                                            {b.customer}
                                            {' «'}
                                            {b.service}
                                            {'» را در «'}
                                            {b.center}
                                            {'» رزرو کرد'}
                                        </span>
                                    </span>
                                );
                            })}
                            {/* Duplicate for seamless loop */}
                            {bookings.map((b) => {
                                const Icon = STATUS_ICON[b.status] ?? Clock;
                                return (
                                    <span key={`dup-${b.id}`} className="flex items-center gap-2 whitespace-nowrap text-body-md text-on-surface-variant">
                                        <Icon className="size-4 shrink-0 text-primary" strokeWidth={1.5}/>
                                        <span>
                                            {b.customer}
                                            {' «'}
                                            {b.service}
                                            {'» را در «'}
                                            {b.center}
                                            {'» رزرو کرد'}
                                        </span>
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
