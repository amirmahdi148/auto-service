import { CalendarClock, MapPin, ChevronLeft, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { HttpService } from "../../utils/HttpService";

interface Booking {
    id: string;
    customer: string;
    service: string;
    center: string;
    vehicle: string;
    date: string;
    dateISO: string;
    time: string;
    status: string;
}

interface BookingsResponse {
    data: Booking[];
}

function getClosestUpcoming(bookings: Booking[], count: number): Booking[] {
    const today = new Date().toISOString().slice(0, 10);
    return bookings
        .filter((b) => b.dateISO >= today)
        .sort((a, b) => a.dateISO.localeCompare(b.dateISO))
        .slice(0, count);
}

export const UserUpcomingBookings = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["bookings", { limit: 50 }],
        queryFn: () => HttpService.get<BookingsResponse>("/api/bookings", { params: { limit: 50 } }),
    });

    const upcoming = getClosestUpcoming(data?.data ?? [], 3);

    return (
        <div className="rounded-2xl bg-surface border border-outline-variant p-6">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-on-surface text-title-lg font-bold">نوبت‌های پیش رو</h2>
                <Link
                    to="/dashboard/bookings"
                    className="text-primary text-label-sm font-bold flex items-center gap-0.5 hover:underline"
                >
                    مشاهده همه <ChevronLeft className="size-3.5" strokeWidth={2}/>
                </Link>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="size-6 animate-spin text-primary" />
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {upcoming.map((booking) => (
                        <div key={booking.id} className="flex flex-col gap-3 p-4 rounded-xl bg-surface-container-low border border-transparent hover:border-primary/20 transition-colors cursor-pointer group">
                            <div className="flex items-start justify-between">
                                <div className="flex flex-col gap-1">
                                    <span className="text-on-surface text-label-lg font-bold group-hover:text-primary transition-colors">{booking.service}</span>
                                    <span className="text-on-surface-variant text-label-sm flex items-center gap-1">
                                        <MapPin className="size-3.5"/> {booking.center}
                                    </span>
                                </div>
                                <span className="text-on-surface-variant text-label-xs bg-surface-container-high px-2 py-1 rounded">کد: {booking.id}</span>
                            </div>
                            
                            <div className="h-px w-full bg-outline-variant/50"></div>
                            
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-primary text-label-sm font-bold bg-primary/10 px-2.5 py-1 rounded-full">
                                    <CalendarClock className="size-4" strokeWidth={2}/>
                                    {booking.date} — {booking.time}
                                </div>
                                <span className="text-on-surface-variant text-label-sm font-bold">{booking.vehicle}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
